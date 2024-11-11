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
import { useToast } from "@/hooks/use-toast";
import { User } from "@/model/user/User";
import { getProfile } from "@/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

interface UserFormProps {
  user: User;
}

const formSchema = z.object({
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
  const { data: session, status } = useSession();
  const token = session?.access_token as string;
  const { toast } = useToast();

  const [defaultValues, setDefaultValues] = useState<{
    username: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
  }>({
    username: user.username,
    fullName: `${user.firstName} ${user.lastName}`,
    phone: user.phone,
    email: user.email,
    address: user.address,
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
        username: data.username,
        fullName: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });
    }
    fetchUser();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <>
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
    </>
  );
}
