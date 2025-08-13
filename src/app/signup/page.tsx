
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="relative flex h-svh flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center">
            <Image
              src="/logofab.png"
              alt="TransitPass Logo"
              width={180}
              height={160}
              className="h-auto w-auto"
            />
          </div>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                    href="/"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
