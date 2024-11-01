"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileUploader } from "@/components/common/file-uploader";
import { useEffect, useState } from "react";
import { Category } from "@/model/category/Category";
import { getListCategory } from "@/services/CategoryService";
import { createProduct } from "@/services/ProductService";
import { Brand } from "@/model/brand/Brand";
import { getListBrand } from "@/services/BrandService";
import { useSession } from "next-auth/react";
import { CategoryGet } from "@/model/category/CategoryGet";
import { ProductPost } from "@/model/product/ProductPost";
import { List, TrashIcon } from "lucide-react";
import { MultiSelect } from "@/components/common/multi-select";
import { PlusIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length <= 8, "You can upload up to 8 images.")
    .refine((files) => files?.length >= 1, "At least one image is required.")
    .refine(
      (files) =>
        files?.every((file: { size: number }) => file.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        files?.every((file: { type: string }) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.array(z.string()).nonempty({
    message: "You have to select at least one category.",
  }),
  brand: z.string().nonempty({
    message: "You have to select at least one brand.",
  }),
  price: z.string().refine((value) => !isNaN(parseFloat(value)), {
    message: "Price must be a valid number.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  options: z
    .array(
      z.object({
        name: z.string().nonempty("Option name is required"),
        value: z.string().nonempty("Option value is required"),
      })
    )
    .optional(),
});

export default function ProductForm() {
  const defaultValues = {
    name: "",
    category: [],
    price: "0",
    description: "",
    options: [{ name: "", value: "" }],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getListCategory(0, 100, "id", "asc", token);
        const categoryGets: CategoryGet[] = response.data;
        setCategories(categoryGets);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();

    async function fetchBrands() {
      try {
        const response = await getListBrand(0, 100, "id", "asc", token);
        const brandsGet: Brand[] = response.data;
        setBrands(brandsGet);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

    fetchBrands();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const product: ProductPost = {
      name: values.name,
      images: values.image,
      slug: values.name.toLowerCase().replace(/ /g, "-"),
      description: values.description,
      sku: "SKU-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      categoryIds: values.category.map((id) => parseInt(id, 10)),
      brandId: parseInt(values.brand, 10),
      options: values.options || [],
      price: parseFloat(values.price),
      isDiscounted: false,
      discount: 0,
      quantity: 0,
      isAvailable: true,
      isDeleted: false,
      isFeatured: false,
    };

    console.log("Product data:", product);

    try {
      const res = await createProduct(product, token);

      if (res && res.status === 200) {
        toast({
          title: "Product Created",
          description: `Product has been created successfully with id ${res.data.id}`,
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Product Creation Failed",
        description:
          "Product creation failed, error from server please contact to admin",
        duration: 5000,
      });
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={6}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {/* <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // setCategorySelected(value);
                      }}
                      // value={field.value[field.value.length - 1]}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      {/* <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id?.toString() || ""}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent> */}
                    {/* </Select> */}
                    <MultiSelect
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category.id?.toString() || "",
                      }))}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      placeholder="Select Category"
                      variant="inverted"
                      animation={2}
                      maxCount={2}
                    />
                    {/* <FormDescription>
                      Selected category: {categorySelected}
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // setBrandSelected(
                        //   brands.find((brand) => brand.name === value) || null
                        // );
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id?.toString() || ""}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>
                      Selected brand: {brandSelected?.name || ""}
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
              <FormLabel>Options</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name={`options.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Option Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Option Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`options.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Option Value</FormLabel>
                        <FormControl>
                          <Input placeholder="Option Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-8 text-red-500 flex items-center bg-transparent hover:bg-rose-200"
                  >
                    <TrashIcon className="h-5 w-5 hover:text-white" />
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: "", value: "" })}
                className="flex items-center gap-2 text-blue-500"
              >
                <PlusIcon className="h-5 w-5" />
                Add Option
              </button>
            </div>

            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
