import { LoginForm } from "@/components/auth/login-form";
import { Icons } from "@/components/icons";
import { Footer } from "@/components/footer";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative grid h-svh flex-col items-center justify-center lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A modern transit hub"
          fill
          className="object-cover"
          data-ai-hint="transit hub"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-8 w-8" />
          TransitPass
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “The journey of a thousand miles begins with a single step. And a
              valid bus pass.”
            </p>
            <footer className="text-sm">Fictional Proverb</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <LoginForm />
            </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
