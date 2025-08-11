
"use client";

import * as React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

// 1. Define the validation schema with Yup
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

type FormData = yup.InferType<typeof formSchema>;

// Dummy API call to fetch user data
const fetchUserData = async (userId: number): Promise<FormData> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  // Map the API response to our form data structure
  return {
    name: data.name,
    username: data.username,
    email: data.email,
  };
};

function AdvancedForm() {
  // 2. Setup react-query to fetch data
  const {
    data: userData,
    isLoading: isFetching,
    isError,
  } = useQuery({
    queryKey: ["user", 1], // Unique key for this query
    queryFn: () => fetchUserData(1), // The function to execute
  });

  // 3. Setup react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  // 4. Pre-populate form when data is loaded
  React.useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  // 5. Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Success!",
      description: "Your information has been updated.",
    });
  };

  if (isFetching) {
    return (
      <Card className="max-w-2xl">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Failed to load user data. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            This form is pre-populated with data fetched using React Query.
            Validation is handled by React Hook Form and Yup.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-xs text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

// Create a client for react-query
const queryClient = new QueryClient();

export default function FormPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center">
        <AdvancedForm />
      </div>
    </QueryClientProvider>
  );
}
