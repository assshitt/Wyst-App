import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-6">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-emerald-400 text-sm font-black text-[#050505]">
              W
            </span>
            <span className="text-lg font-bold tracking-[0.2em]">WYST</span>
          </div>
          <p className="text-sm text-zinc-500">Swap. Earn. Repeat.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <Link href="/browse" className="hover:text-white">
            Browse
          </Link>
          <Link href="/upload" className="hover:text-white">
            Upload
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
          <Link href="/signup" className="hover:text-white">
            Sign Up
          </Link>
        </nav>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} WYST. Zero cash. All points.
        </p>
      </div>
    </footer>
  );
}
