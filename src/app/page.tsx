import { LoginForm } from "@/components/auth/login-form";
import { Icons } from "@/components/icons";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative grid h-svh flex-col items-center justify-center lg:grid-cols-2 lg:px-0">
      <LoginForm />
    </div>
  );
}
