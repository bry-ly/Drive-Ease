import AuthForgotPassword  from "@/components/ui/auth-forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <AuthForgotPassword />
      </div>
    </div>
  );
}
