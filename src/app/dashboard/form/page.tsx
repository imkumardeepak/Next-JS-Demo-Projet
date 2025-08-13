"use client";

import * as React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  bio: yup.string().max(160, "Bio must be less than 160 characters"),
  role: yup
    .string()
    .oneOf(["user", "editor", "admin"])
    .required("Role is required"),
  newsletter: yup.boolean(),
  notificationType: yup.string().oneOf(["email", "sms", "none"]).required(),
  enableDarkMode: yup.boolean(),
  birthDate: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
});

type FormData = yup.InferType<typeof formSchema>;

// Dummy API call to fetch user data
const fetchUserData = async (userId: number): Promise<Partial<FormData>> => {
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      newsletter: false,
      notificationType: "email",
      enableDarkMode: true,
      role: "user",
    },
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
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-24 w-full" />
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
      <Card className="shadow-lg">
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
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            A comprehensive form showcasing various input types with validation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Text Inputs in a grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us a little about yourself"
            />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Select Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.birthDate && (
                <p className="text-xs text-destructive">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Radio Group */}
          <div className="space-y-2">
            <Label>Notification Type</Label>
            <Controller
              name="notificationType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="r-email" />
                    <Label htmlFor="r-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="r-sms" />
                    <Label htmlFor="r-sms">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="r-none" />
                    <Label htmlFor="r-none">None</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.notificationType && (
              <p className="text-xs text-destructive">
                {errors.notificationType.message}
              </p>
            )}
          </div>

          {/* Checkbox and Switch */}
          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex items-center space-x-2">
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="newsletter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="newsletter"
                className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subscribe to newsletter
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Controller
                name="enableDarkMode"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="enableDarkMode"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="enableDarkMode">Enable Dark Mode</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save All Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

// Create a client for react-query

export default function FormPage() {
  return (
    <div className="w-full">
      <AdvancedForm />
    </div>
  );
}
