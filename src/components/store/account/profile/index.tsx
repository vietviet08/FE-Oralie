"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/model/user/User";
import { getImageProfile, getProfile } from "@/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

interface UserFormProps {
  user: User;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  userImage: z
    .any()
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid image type"
    )
    .optional(),
  username: z
    .string()
    .min(3, "Username is too short")
    .nonempty("Username is required"),
  fullName: z.string().min(3, "Name is too short").nonempty("Name is required"),
  phone: z.string().nonempty("Phone is required"),
  email: z.string().email("Invalid email"),
  address: z
    .string()
    .min(5, "Address is too short")
    .nonempty("Address is required"),
});

export default function Profile({ user }: UserFormProps) {
  const { data: session } = useSession();
  const token = session?.access_token as string;

  const [defaultValues, setDefaultValues] = useState<{
    userImage: string;
    username: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
  }>({
    userImage: user.urlAvatar as string,
    username: user.username as string,
    fullName: `${user.firstName} ${user.lastName}` as string,
    phone: user.phone as string,
    email: user.email as string,
    address: user.address as string,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await getProfile(token);
      const data = response.data;
      setDefaultValues({
        userImage: data.urlAvatar,
        username: data.username,
        fullName: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });
    }
    fetchUser();

    async function fetchImage() {
      const response = await getImageProfile(token);
      const data = response.data;
      setDefaultValues({
        ...defaultValues,
        userImage: data.urlAvatar,
      });
    }

    fetchImage();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Enter your email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
