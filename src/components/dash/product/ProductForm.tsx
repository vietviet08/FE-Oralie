"use client";
import "react-quill/dist/quill.snow.css";
import * as React from "react";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {FileUploader} from "@/components/common/file-uploader";
import {Category} from "@/model/category/Category";
import {getAllCategoriesNotId} from "@/services/CategoryService";
import {createProduct, updateProduct} from "@/services/ProductService";
import {Brand} from "@/model/brand/Brand";
import {getAllBrand} from "@/services/BrandService";
import {useSession} from "next-auth/react";
import {CategoryGet} from "@/model/category/CategoryGet";
import {ProductPost} from "@/model/product/ProductPost";
import {TrashIcon} from "lucide-react";
import {MultiSelect} from "@/components/common/multi-select";
import {PlusIcon} from "@radix-ui/react-icons";
import {useToast} from "@/hooks/use-toast";
import {Product} from "@/model/product/Product";
import ReactQuill from "react-quill";
import {useRouter} from "next/navigation";

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
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{align: ["right", "center", "justify"]}],
        [{list: "ordered"}, {list: "bullet"}],
        ["link", "image"],
    ],
};

const formSchema = z.object({
    image: z
        .any()
        .refine((files) => files?.length <= 8, "You can upload up to 8 images.")
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
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    category: z.array(z.string()).nonempty({
        message: "You have to select at least one category.",
    }),
    brand: z.string().min(1, {
        message: "You have to select at least one brand.",
    }),
    price: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: "Price must be a valid number.",
    }),
    discount: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: "Discount must be a valid number.",
    }),
    quantity: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: "Quantity must be a valid number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
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

export default function ProductForm({product}: ProductFormProps) {
    // const convertUrlsToFiles = async (urls: string[]) => {
    //     const files = await Promise.all(
    //         urls.map(async (url) => {
    //             const response = await fetch(url);
    //             const blob = await response.blob();
    //             const filename = url.split("/").pop() || "file";
    //             const mimeType = blob.type;
    //             return new File([blob], filename, {type: mimeType});
    //         })
    //     );
    //     return files;
    // };

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
    const {data: session,} = useSession();
    const token = session?.access_token as string;

    const {toast} = useToast();

    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "options",
    });

    useEffect(() => {
        const fetchImages = async () => {
            if (!product?.images || product.images.length === 0) return;
            const filePromises = product.images.map(async (imageUrl, index) => {
                try {
                    const response = await fetch(imageUrl.url);
                    console.log("image fetched: ", response);
                    const blob = await response.blob();
                    const file = new File([blob], `image-${index}.jpg`, {
                        type: blob.type,
                    });
                    return file;
                } catch (e) {
                    console.log("error while fetch image: ", e)
                    return null
                }

            });

            const files = (await Promise.all(filePromises)).filter(file => file !== null) as File[];
            setDefaultValues((prev) => {
                return ({...prev, image: files})
            });
        };

        fetchImages();

        async function fetchCategories() {
            try {
                const categoryGets: CategoryGet[] = await getAllCategoriesNotId(0, false);
                setCategories(categoryGets);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchCategories();

        async function fetchBrands() {
            try {
                const brandsGet: Brand[] = await getAllBrand();
                setBrands(brandsGet);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        }

        fetchBrands();
    }, [product?.images]);

    console.log("images", defaultValues.image);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const productPost: ProductPost = {
            name: values.name,
            images: values.image,
            slug: values.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-"),
            description: values.description,
            sku: Math.random().toString(36).substr(2, 9).toUpperCase(),
            categoryIds: values.category.map((id) => parseInt(id, 10)),
            brandId: parseInt(values.brand, 10),
            options: values.options || [],
            specifications: values.specifications || [],
            price: parseFloat(values.price),
            isDiscounted: parseFloat(values.discount) > 0.0,
            discount: parseFloat(values.discount),
            quantity: parseInt(values.quantity, 10),
            isAvailable: true,
            isDeleted: false,
            isFeatured: false,
        };

        console.log("Product data:", product);

        try {
            let res;
            if (product) {
                if (product.id !== undefined) {
                    res = await updateProduct(product.id, productPost, token);
                    console.log("updating product" + values.category);
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
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            maxFiles={8}
                                            maxSize={4 * 1024 * 1024}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter product name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <MultiSelect
                                            options={categories.map((category) => ({
                                                label: category.name,
                                                value: category.id?.toString() || "",
                                            }))}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            // defaultValue={field.value}
                                            value={field.value}
                                            placeholder="Select Category"
                                            variant="inverted"
                                            animation={2}
                                            maxCount={4}
                                        />
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="brand"
                                render={({field}) => (
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
                                                    <SelectValue placeholder="Select brand"/>
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                placeholder="Enter price"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discount"
                                render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
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
                                    <FormMessage/>
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
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Option Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Option Name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`options.${index}.value`}
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Option Value</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Option Value" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="mt-8 text-red-500 flex items-center bg-transparent hover:bg-rose-200"
                                    >
                                        <TrashIcon className="h-5 w-5 hover:text-white"/>
                                    </Button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => append({name: "", value: ""})}
                                className="flex items-center gap-2 text-blue-500"
                            >
                                <PlusIcon className="h-5 w-5"/>
                                Add Option
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <FormLabel>Specifications</FormLabel>
                            {form.watch("specifications")?.map((field, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <FormField
                                        control={form.control}
                                        name={`specifications.${index}.name`}
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Specification Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Specification Name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`specifications.${index}.value`}
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Specification Value</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Specification Value" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            form.setValue(
                                                "specifications",
                                                form
                                                    .watch("specifications")
                                                    ?.filter((_, i) => i !== index) || []
                                            )
                                        }
                                        className="mt-8 text-red-500 flex items-center bg-transparent hover:bg-rose-200"
                                    >
                                        <TrashIcon className="h-5 w-5 hover:text-white"/>
                                    </Button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                    form.setValue("specifications", [
                                        ...(form.watch("specifications") || []),
                                        {name: "", value: ""},
                                    ])
                                }
                                className="flex items-center gap-2 text-blue-500"
                            >
                                <PlusIcon className="h-5 w-5"/>
                                Add Specification
                            </button>
                        </div>

                        <Button disabled={form.formState.isSubmitting} type="submit">{product ? <>Update</> : <>Create</>}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
