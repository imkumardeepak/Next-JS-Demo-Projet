import { LoginForm } from "@/components/auth/login-form";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
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
      <div className="p-4 sm:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}