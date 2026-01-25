"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Quote, Eye, EyeOff, Command } from "lucide-react";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mr-2 h-4 w-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    toast.success("Welcome back to Orbit 360!");
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen w-full font-sans overflow-hidden bg-white light">
      <style jsx global>{`
        body {
          overflow: hidden;
          height: 100vh;
          background: white !important;
        }
        .form-side label,
        .form-side h1,
        .form-side span {
          color: #0f172a !important; /* slate-900 */
        }
        .form-side .text-slate-400 {
          color: #94a3b8 !important;
        }
        .form-side .text-slate-500 {
          color: #64748b !important;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Left Column: Form Section */}
      <div className="flex w-full flex-col p-6 lg:w-1/2 xl:p-10 justify-center bg-white form-side">
        <div className="flex items-center gap-2 mb-8 select-none">
          <Image
            src="/orbit360-logoBlack.png"
            alt="Orbit 360"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Orbit 360
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[440px] flex-col justify-center flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Login to your account
            </h1>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 text-sm">
            <Button
              variant="outline"
              type="button"
              className="w-full h-10 border-slate-200 hover:bg-slate-50 font-semibold text-slate-900"
              onClick={() => handleAuth()}
            >
              <GoogleIcon />
              Login with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-900">
                Role
              </Label>
              <Select defaultValue="user">
                <SelectTrigger
                  id="role"
                  className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900 border-slate-200">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="luke@exaltstudio.co"
                className="h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-10 border-slate-200 pr-10 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end text-xs">
              <Link
                href="#"
                className="font-semibold text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Footer Branding */}
        <div className="mt-auto flex items-center justify-center gap-2 text-slate-400 select-none">
          <Command size={14} className="text-slate-300" />
          <span className="text-xs font-medium tracking-tight text-slate-400">
            Powered by{" "}
            <a
              href="https://www.evoclabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Evoc Labs.
            </a>
          </span>
        </div>
      </div>

      {/* Right Column: Visual Section */}
      <div className="hidden lg:relative lg:flex lg:w-1/2 flex-col overflow-hidden bg-[#001E3C]">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Main Side Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)",
          }}
        ></div>

        <div className="relative z-10 flex flex-col p-12 h-full justify-between">
          <div className="max-w-[540px] space-y-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Quote className="text-blue-400" size={24} fill="currentColor" />
            </div>

            <h2
              className="text-3xl font-medium leading-tight"
              style={{ color: "white" }}
            >
              "Orbit 360 has redefined how we manage our core operations. The
              seamless integration of logistics and marketing allows us to focus
              on what truly matters—our growth and our customers."
            </h2>

            <div className="space-y-1">
              <div className="text-lg font-bold" style={{ color: "white" }}>
                Kishor Irnak
              </div>
              <div className="text-blue-400/80" style={{ color: "#60a5fa" }}>
                Chief Operating Officer
              </div>
            </div>
          </div>

          {/* App Preview Frame */}
          <div className="relative mt-8 transform translate-x-8 translate-y-8 shadow-2xl rounded-tl-2xl overflow-hidden border-t-8 border-l-8 border-white/10 bg-white/5 backdrop-blur-sm max-h-[60%]">
            <Image
              src="/Orbit360-preivew-image.JPG"
              alt="Orbit 360 Dashboard Preview"
              width={1200}
              height={800}
              className="opacity-100 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
