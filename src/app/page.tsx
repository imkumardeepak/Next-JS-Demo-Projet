import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex h-svh flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <LoginForm />
    </div>
  );
}
