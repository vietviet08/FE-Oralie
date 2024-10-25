'use client';

import * as React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {FileUploader} from "@/components/common/file-uploader";
import {useEffect, useState} from "react";
import {Category} from "@/model/category/Category";
import {getListCategory} from "@/services/CategoryService";
import {createProduct} from "@/services/ProductService";
import {Product} from "@/model/product/Product";
import {Brand} from "@/model/brand/Brand";
import {getListBrand} from "@/services/BrandService";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
];

const formSchema = z.object({
    image: z
        .any()
        .refine((files) => files?.length == 1, 'Image is required.')
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            `Max file size is 5MB.`
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
    name: z.string().min(2, {
        message: 'Product name must be at least 2 characters.'
    }),
    category: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one category.'
    }),
    brand: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one brand.'
    }),
    price: z.string().refine((value) => !isNaN(parseFloat(value)), {
        message: 'Price must be a valid number.'
    }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    })
});

export default function ProductForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            category: [],
            brand: [],
            price: '',
            description: ''
        }
    });


    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [brandSelected, setBrandSelected] = useState<Brand>();

    useEffect(() => {
        async function fetchCategories() {

            try {
                const session: Session | null = await getServerSession(authOptions);
                const token = session?.access_token as string;


                const response = await getListCategory(0, 100, 'id', 'asc', token);
                const data = await response.data.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories().then(r => r);

        async function fetchBrands() {

            try {

                const session: Session | null = await getServerSession(authOptions);
                const token = session?.access_token as string;

                const response = await getListBrand(0, 100, 'id', 'asc', token);
                const data = await response.data.json();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        }

        fetchBrands().then(r => r);

    }, []);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const product: Product = {
            name: values.name,
            slug: values.name.toLowerCase().replace(/ /g, '-'),
            description: values.description,
            sku: 'SKU-' + Math.random().toString(36).substr(2, 9),
            brand: brandSelected,
            options: [],
            price: parseFloat(values.price),
            isDiscount: false,
            discount: 0,
            quantity: 0,
            isFeatured: false,
            isPromoted: false
        };

        createProduct(product).then(response => {
            console.log('Product created:', response);
        }).catch(error => {
            console.error('Error creating product:', error);
        });
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
                            render={({field}) => (
                                <div className="space-y-6">
                                    <FormItem className="w-full">
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <FileUploader
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                maxFiles={4}
                                                maxSize={4 * 1024 * 1024}
                                                // disabled={loading}
                                                // progresses={progresses}
                                                // pass the onUpload function here for direct upload
                                                // onUpload={uploadFiles}
                                                // disabled={isUploading}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </div>
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
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange([...field.value, value])
                                            }
                                            value={field.value[field.value.length - 1]}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select categories"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selected categories: {field.value.join(', ')}
                                        </FormDescription>
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
                                                setBrandSelected(brands.find((brand) => brand.name === value));
                                            }
                                            }
                                            value={field.value[field.value.length - 1]}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Brands"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {brands.map((brand) => (
                                                    <SelectItem key={brand.id} value={brand.name}>
                                                        {brand.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Selected brands: {field.value.join(', ')}
                                        </FormDescription>
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
                                                step="0.01"
                                                placeholder="Enter price"
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
                                        <Textarea
                                            placeholder="Enter product description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Product</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
