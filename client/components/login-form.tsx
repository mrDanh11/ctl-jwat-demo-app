"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please input email")
    .email("Please input correct email format"),
  password: z
    .string()
    .min(1, "Please input password")
    .max(20, "Password no longer than 20 characters"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Simulated API call ────────────────────────────────────────────────────────
// async function loginApi(data: { email: string; password: string }) {
//   await new Promise((r) => setTimeout(r, 1500))

//   if (data.email === "locked@example.com") {
//     throw new Error("Tài khoản đã bị khóa")
//   }
//   if (data.email === "error@example.com") {
//     throw new Error("Server is unavailable")
//   }
//   if (data.password !== "Admin123") {
//     throw new Error("Email hoặc mật khẩu không chính xác")
//   }

//   return { success: true }
// }

// ─── ErrorMessage helper ──────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
      <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit", // just validate when submit
    reValidateMode: "onSubmit", // then only validate again when submit, not onChange or onBlur
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      toast.success("Login successful!", {
        description: "Redirecting to dashboard...",
      });
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error("Login failed", {
        description: message,
      });
    }
  };

  return (
    <div
      className={cn("flex items-center justify-center p-4", className)}
      {...props}
    >
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* ── Left panel ── */}
        <div className="hidden md:flex flex-col items-start justify-center gap-8 bg-[#EEF2F7] p-10 w-[42%] shrink-0">
          <Image
            src="/security.png"
            alt="Security"
            width={420}
            height={320}
            className="object-contain self-center"
          />
          <div className="space-y-2 max-w-sm">
            <p className="font-semibold text-gray-800 text-sm">
              Secure: Your data is safe with us
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              We use industry-standard encryption to protect your personal
              information.
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 px-8 py-10 md:px-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="font-semibold text-gray-800">AcmeApp</span>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-sm text-gray-500 mt-1">
              Login to continue to your account
            </p>
          </div>

          {/* ── Server error banner ── */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <span>Invalid email or password</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* ── Email ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register("email")}
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-700 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:border-transparent transition",
                    errors.email
                      ? "border-red-400 bg-red-50 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-500",
                  )}
                />
              </div>
              <FieldError message={errors.email?.message} />
            </div>

            {/* ── Password ── */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                  className={cn(
                    "w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm text-gray-700 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:border-transparent transition",
                    errors.password
                      ? "border-red-400 bg-red-50 focus:ring-red-400"
                      : "border-gray-200 focus:ring-blue-500",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError message={errors.password?.message} />
              <div className="flex justify-end">
                <Link
                  href="/blank-page"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* ── Remember me ── */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 select-none cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* ── Submit button ── */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold tracking-wide transition",
                "bg-blue-600 text-white",
                loading || isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700 active:bg-blue-800",
              )}
            >
              {(loading || isSubmitting) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {loading || isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* ── Social buttons ── */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => loginWithGoogle()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image
                  src="/google_logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                Login with Google
              </button>

              <button
                type="button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
                Login with Facebook
              </button>
            </div>
          </form>

          {/* Sign up */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/blank-page"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
