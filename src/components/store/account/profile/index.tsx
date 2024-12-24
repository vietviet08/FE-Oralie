"use client";

import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import Image from "next/image";
import {parseJwt} from "@/utils/encryption";
import * as React from "react";

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const formSchema = z.object({
    username: z.string(),
    picture: z
        .any()
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Invalid image type"
        )
        .optional(),
    fullName: z.string().min(3, "Name is too short").nonempty("Name is required"),
    phone: z.string().nonempty("Phone is required"),
    email: z.string().email("Invalid email"),
    address: z
        .string()
        .min(5, "Address is too short")
        .nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
});

export default function ProfileUserStore() {
    const {data: session} = useSession();
    const token = session?.access_token as string;
    const infoUser = parseJwt(token as string);

    const [defaultValues, setDefaultValues] = useState<{
        picture: string;
        username: string;
        fullName: string;
        phone: string;
        email: string;
        address: string;
        city: string;
    }>({
        picture: infoUser.picture as string,
        username: infoUser.preferred_username as string,
        fullName: infoUser.name as string,
        phone: infoUser.phone as string,
        email: infoUser.email as string,
        address: infoUser.address as string,
        city: infoUser.city as string
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="w-full flex gap-4 p-4">
            <div className="w-full lg:w-1/5 flex  flex-col justify-start items-center gap-2">
                <div className="w-24 h-24 rounded-full overflow-hidden ">
                    <Image src={defaultValues.picture} alt={defaultValues.username} width={120} height={120}
                           className="w-full object-contain"/>
                </div>
                <div className=" ">
                    <Input type="file" placeholder="Choose image" className="h-8"/>
                </div>
            </div>
            <div className="w-full lg:w-4/5 flex flex-col justify-center items-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your address" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your city" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit"
                                className="border border-primaryred bg-primaryred text-white hover:bg-white hover:text-primaryred">Update
                            profile</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}