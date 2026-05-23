import Link from "next/link";
import { AuthInput, AuthLogo, GoogleButton } from "@/components/AuthForm";

export const metadata = {
  title: "Sign Up — WYST",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
        <AuthLogo />
        <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-center text-sm font-medium text-emerald-400">
          New users get 100 welcome points!
        </div>
        <h1 className="text-center text-2xl font-bold text-white">Join WYST</h1>
        <p className="mt-1 text-center text-sm text-zinc-500">Swap clothes. Earn points. No cash.</p>

        <form className="mt-8 space-y-4">
          <AuthInput label="Username" placeholder="your_username" />
          <AuthInput label="Email" type="email" placeholder="you@college.edu" />
          <AuthInput label="College / Campus" placeholder="Delhi University" />
          <AuthInput label="Password" type="password" placeholder="••••••••" />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#22c55e] py-3 font-bold text-[#050505] transition-colors hover:bg-emerald-400"
          >
            Create account
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-zinc-500">or</span>
          </div>
        </div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
