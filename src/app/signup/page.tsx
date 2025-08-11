import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
       <div className="p-4 sm:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <SignupForm />
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
         <Image
          src="https://placehold.co/1080x1920.png"
          alt="A smiling person using their phone on a bus"
          fill
          className="object-cover"
          data-ai-hint="bus passenger"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-8 w-8" />
          TransitPass
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "A seamless journey starts here. Get your digital pass in seconds and ride with ease."
            </p>
            <footer className="text-sm">The Future of Transit</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
