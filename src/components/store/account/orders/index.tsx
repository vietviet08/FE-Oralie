"use client";

import React, { useEffect, useState } from "react";
import { OrderResponse } from "@/model/order/response/OrderResponse";
import { useSession } from "next-auth/react";
import { cancelOrderByCustomer, getOrders } from "@/services/OrderService";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { postRate } from "@/services/RateService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RatePost } from "@/model/rate/RatePost";
import { useToast } from "@/hooks/use-toast";
import { OrderItemResponse } from "@/model/order/response/OrderItemResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "@/components/common/file-uploader";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/encryption";

const orderHeader = [
  { name: "Index", className: "text-left" },
  { name: "Create at", className: "" },
  { name: "Total price", className: "" },
  { name: "Voucher", className: "" },
  { name: "Discount", className: "" },
  { name: "Shipping fee", className: "" },
  { name: "Payment method", className: "" },
  { name: "Payment status", className: "" },
  { name: "Status order", className: "" },
  { name: "", className: "" },
];

const MAX_FILE_SIZE = 8000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "video/mp4",
];

const formSchema = z.object({
  userId: z.string().nonempty("Name is required"),
  productId: z.number(),
  orderItemId: z.number(),
  rateStar: z.number().min(1, "Rate star is required"),
  content: z.string().nonempty("Content is required"),
  files: z
    .any()
    .refine((files) => files?.length <= 4, "You can upload up to 4 images.")
    .refine((files) => files?.length >= 1, "At least one image is required.")
    .refine(
      (files) =>
        files?.every((file: { size: number }) => file.size <= MAX_FILE_SIZE),
      `Max file size is 8MB.`
    )
    .refine(
      (files) =>
        files?.every((file: { type: string }) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      ".jpg, .jpeg, .png, .webp, and .mp4 files are accepted."
    )
    .optional(),
});

const OrdersTemplate = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const token = session?.access_token;
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null
  );
  const [isOpenRate, setIsOpenRate] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] =
    useState<OrderItemResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false);

  const infoUser = parseJwt(token as string);

  const [defaultValues, setDefaultValues] = useState<{
    userId: string;
    productId: number;
    orderItemId: number;
    rateStar: number;
    content: string;
    urlFile: File[];
  }>({
    userId: infoUser.sub,
    productId: 0,
    orderItemId: 0,
    rateStar: 5,
    content: "",
    urlFile: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const fetchOrders = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await getOrders(token);
      setOrders(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast({
        title: "Error fetching orders",
        description: `There was an error while trying to fetch orders. Please try again later.`,
        variant: "destructive",
        duration: 3000,
      });
      router.push("/");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, refreshOrders]);

  const handleOpenDetailOrder = (orderResponse: OrderResponse) => {
    setSelectedOrder(orderResponse);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenRate = (orderItemResponse: OrderItemResponse) => {
    setSelectedOrderItem(orderItemResponse);
    form.setValue("productId", orderItemResponse.productId);
    form.setValue("orderItemId", orderItemResponse.id as number);
    setIsOpenRate(true);
  };

  const handleCloseDialogRate = () => {
    setIsOpenRate(false);
    setSelectedOrderItem(null);
    form.reset();
  };

  const handledCancelOrder = async (orderResponse: OrderResponse) => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await cancelOrderByCustomer(
        token,
        orderResponse.id as number
      );
      if (res) {
        toast({
          title: "Order Cancelled",
          description: `Order has been cancelled successfully with id ${res.data.id}`,
          duration: 3000,
        });
        setRefreshOrders((prevState) => !prevState);
      }
    } catch (e) {
      toast({
        title: "Error cancelling order",
        description: `There was an error while trying to cancel your order. Please try again later.`,
        variant: "destructive",
        duration: 3000,
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const rateRequest = {
      id: undefined,
      userId: values.userId,
      productId: values.productId,
      orderItemId: values.orderItemId,
      rateStar: values.rateStar,
      content: values.content,
      files: values.files,
      isAvailable: true,
      parentRate: 0,
      subRates: [],
      userInfo: infoUser,
    } as RatePost;

    console.log(rateRequest);

    try {
      setIsLoading(true);
      const res = await postRate(
        token as string,
        values.productId as number,
        rateRequest
      );
      if (res) {
        console.log(res);
        toast({
          title: "Product Rated",
          description: `Product has been rated successfully with id ${res.data.id}`,
          duration: 3000,
        });
        setRefreshOrders((prevState) => !prevState);
        handleCloseDialogRate();
      }
    } catch (e) {
      toast({
        title: "Error rating product",
        description: `There was an error while trying to rate your product. Please try again later.`,
        variant: "destructive",
        duration: 3000,
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading && <div className="text-center">Loading...</div>}
      <div className="w-full rounded-lg p-4 flex justify-center items-center">
        {orders && orders.length === 0 && !isLoading && (
          <div className="flex justify-center items-center">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Oops</AlertTitle>
              <AlertDescription>
                Your don&#39;t have any order yet, let&#39;s buy something
              </AlertDescription>
            </Alert>
          </div>
        )}
        {orders && orders.length > 0 && (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {orderHeader.map((item, index) => (
                  <TableCell key={index} className={item.className}>
                    {item.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell className=" text-left">{index}</TableCell>
                  <TableCell className="">{item.createdAt}</TableCell>
                  <TableCell className=" ">{item.totalPrice}</TableCell>
                  <TableCell className=" text-ellipsis">
                    {item.voucher}
                  </TableCell>
                  <TableCell className=" ">{item.discount}</TableCell>
                  <TableCell className=" ">{item.shippingFee}</TableCell>
                  <TableCell className=" ">{item.paymentMethod}</TableCell>
                  <TableCell className=" ">{item.paymentStatus}</TableCell>
                  <TableCell className=" ">{item.status}</TableCell>
                  <TableCell className="">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenDetailOrder(item)}
                    >
                      Detail
                    </Button>
                  </TableCell>
                  <TableCell className="">
                    <Button
                      variant="destructive"
                      onClick={() => handledCancelOrder(item)}
                      disabled={
                        item.status === "SHIPPING" ||
                        item.status === "CANCELLED"
                      }
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail your order</DialogTitle>
            <DialogDescription>
              Order code: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && selectedOrder.orderItems && (
            <Table className="w-full">
              <TableBody>
                {selectedOrder.orderItems.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <TableCell className=" text-left">{index}</TableCell>
                    <TableCell className="">
                      {item.productImage ? (
                        <div className="relative">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={120}
                            height={120}
                            className="w-20 h-20 object-contain rounded border border-gray-200"
                            priority
                            unoptimized
                            onError={(e) => {
                              console.error(`Error loading image: ${item.productImage}`);
                              e.currentTarget.src = "/placeholder-image.jpg";
                            }}
                          />
                          {process.env.NODE_ENV === 'development' && (
                            <div className="absolute bottom-0 right-0 text-[8px] text-black bg-gray-100 opacity-75 p-1 truncate max-w-[80px]">
                              {item.productImage.split('/').pop()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                          No Image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className=" text-ellipsis">
                      {item.productName}
                    </TableCell>
                    <TableCell className=" ">{item.quantity}</TableCell>
                    <TableCell className=" ">{item.totalPrice}</TableCell>
                    <TableCell className=" ">
                      <Button
                        variant="outline"
                        onClick={() => handleOpenRate(item)}
                        disabled={item.isRated}
                      >
                        Rate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
              className="bg-primaryred text-white border-primaryred hover:bg-white hover:text-primaryred"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenRate} onOpenChange={setIsOpenRate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate {selectedOrderItem?.productName}</DialogTitle>
            <DialogDescription>
              Product code: {selectedOrderItem?.productId}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="rateStar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate Star</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter rate star"
                          {...field}
                          type="number"
                          defaultValue={5}
                          min={1}
                          max={5}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your rate content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderItemId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OrderItem ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="OrderItem ID"
                          {...field}
                          value={selectedOrderItem?.id}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product ID"
                          {...field}
                          value={selectedOrderItem?.productId}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Button type="submit" disabled={isLoading}>
                  Rate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialogRate}
                  className="bg-primaryred text-white border-primaryred hover:bg-white hover:text-primaryred"
                >
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTemplate;
