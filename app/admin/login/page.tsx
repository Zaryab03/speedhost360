import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login | SpeedHost360",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-4">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">
        SpeedHost360 Admin
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Sign in</h1>
      <div className="mt-8">
        <AdminLoginForm />
      </div>
    </div>
  );
}
