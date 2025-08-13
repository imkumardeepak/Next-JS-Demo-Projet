import { LoginForm } from "@/components/auth/login-form";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex h-svh flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
