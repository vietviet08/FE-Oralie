"use client";

import "react-quill/dist/quill.snow.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "@/components/common/file-uploader";
import { Category } from "@/model/category/Category";
import { getAllCategoriesNotId } from "@/services/CategoryService";
import { createProduct, updateProduct } from "@/services/ProductService";
import { Brand } from "@/model/brand/Brand";
import { getAllBrand } from "@/services/BrandService";
import { useSession } from "next-auth/react";
import { CategoryGet } from "@/model/category/CategoryGet";
import { ProductPost } from "@/model/product/ProductPost";
import { TrashIcon, XCircleIcon } from "lucide-react";
import { MultiSelect } from "@/components/common/multi-select";
import { PlusIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/model/product/Product";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/model/product/ProductImage";
import Image from "next/image";

interface ProductFormProps {
  product?: Product;
}

const MAX_FILE_SIZE = 8000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const modulesQuill = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  image: z.array(z.instanceof(File)).optional(),
  category: z.array(z.string()).min(1, "At least one category is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.string().optional(),
  quantity: z.string().min(1, "Quantity is required"),
  description: z.string().min(1, "Description is required"),
  options: z
    .array(
      z.object({
        name: z.string().min(1, "Option name is required"),
        value: z.string().min(1, "Option value is required"),
      })
    )
    .optional(),
  specifications: z
    .array(
      z.object({
        name: z.string().min(1, "Specification name is required"),
        value: z.string().min(1, "Specification value is required"),
      })
    )
    .optional(),
});

export default function ProductForm({ product }: ProductFormProps) {
  const [existingImages, setExistingImages] = useState<ProductImage[]>(
    product?.images || []
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const [defaultValues, setDefaultValues] = useState<{
    name: string;
    image: File[];
    category: string[];
    brand: string;
    price: string;
    discount: string;
    quantity: string;
    description: string;
    options: { name: string; value: string }[];
    specifications: { name: string; value: string }[];
  }>({
    name: product?.name || "",
    image: [],
    category:
      product?.productCategories?.map(
        (category) => category.id?.toString() ?? ""
      ) || [],
    brand: product?.brand?.id?.toString() || "",
    price: product?.price.toString() || "",
    discount: product?.discount.toString() || "",
    quantity: product?.quantity.toString() || "",
    description: product?.description || "",
    options: product?.options || [],
    specifications: product?.specifications || [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const { data: session, } = useSession();
  const token = session?.access_token as string;

  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const { fields: optionsFields, append: appendOption, remove: removeOption } = useFieldArray({
    control: form.control,
    name: "options",
  });
  const {
    fields: specificationsFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getAllCategoriesNotId(0, false);
        const fetchedBrands = await getAllBrand();
        const optionsMapped = fetchedCategories.map((category: Category) => {
          return {
            label: category.name,
            value: category.id?.toString() || "",
          };
        });
        setCategories(fetchedCategories);
        setCategoriesOptions(optionsMapped);
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle removing an existing image
  const handleRemoveExistingImage = (imageUrl: string) => {
    setExistingImages(existingImages.filter(img => img.url !== imageUrl));
    setImagesToDelete([...imagesToDelete, imageUrl]);
  };

  // Fetch existing images as visual preview
  const getVisualExistingImages = () => {
    if (!existingImages || existingImages.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-4 mt-2">
        {existingImages.map((image, index) => (
          <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden">
            <Image
              src={image.url}
              alt={image.name || `Product image ${index}`}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(image.url)}
              className="absolute top-0 right-0 bg-white rounded-full p-1"
            >
              <XCircleIcon className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a list of existing image URLs that are being kept (not marked for deletion)
    const keptExistingImageUrls = existingImages.map(img => img.url);
    
    const productPost: ProductPost = {
      name: values.name,
      slug: values.name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(/[^a-z0-9-]/g, ""),
      description: values.description,
      sku: values.name
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(/[^a-z0-9-]/g, ""),
      price: parseFloat(values.price),
      discount: values.discount ? parseFloat(values.discount) : 0,
      quantity: parseInt(values.quantity),
      isDiscounted: values.discount
        ? parseFloat(values.discount) > 0
        : false,
      isAvailable: parseInt(values.quantity) > 0,
      isDeleted: false,
      isFeatured: false,
      isPromoted: false,
      categoryIds: values.category.map((category) => parseInt(category)),
      brandId: parseInt(values.brand),
      images: values.image || [],
      deletedImageUrls: imagesToDelete,
      existingImageUrls: keptExistingImageUrls,
      options: values.options || [],
      specifications: values.specifications || [],
    };

    try {
      let res;
      if (product) {
        if (product.id !== undefined) {
          console.log("Updating product with images:", {
            new: values.image?.length || 0,
            kept: keptExistingImageUrls.length,
            deleted: imagesToDelete.length
          });
          
          res = await updateProduct(product.id, productPost, token);
          
          if (res && res.status === 200) {
            toast({
              title: "Product Updated",
              description: `Product has been updated successfully with id ${res.data.id}`,
              duration: 3000,
            });
            router.push("/admin/products");
            router.refresh();
          }
        }
      } else {
        res = await createProduct(productPost, token);
        if (res && res.status === 200) {
          toast({
            title: "Product Created",
            description: `Product has been created successfully with id ${res.data.id}`,
            duration: 3000,
          });
          router.push("/admin/products");
          router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Product Creation Failed",
        description: (error as unknown as {
          response?: { data?: { errorMessage?: string } }
        }).response?.data?.errorMessage || "An unknown error occurred",
        duration: 3000,
      });
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {product ? <>Update Product</> : <>Create Product</>}
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
                  {product && existingImages.length > 0 && (
                    <div className="mb-4">
                      <FormLabel>Current Images</FormLabel>
                      {getVisualExistingImages()}
                    </div>
                  )}
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={8}
                      maxSize={4 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoriesOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select categories"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brands</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand"/>
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id?.toString() || ""}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        placeholder="Enter discount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        placeholder="Enter quantity"
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
                    <ReactQuill
                      modules={modulesQuill}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter product description"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Options</FormLabel>
              {optionsFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name={`options.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Option name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`options.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Option value"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeOption(index)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendOption({ name: "", value: "" })}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>

            <div className="space-y-2">
              <FormLabel>Specifications</FormLabel>
              {specificationsFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Specification name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="Specification value"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeSpecification(index)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendSpecification({ name: "", value: "" })}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Specification
              </Button>
            </div>

            <Button type="submit">{product ? "Update" : "Create"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
