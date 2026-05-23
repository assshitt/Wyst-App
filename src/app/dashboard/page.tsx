import { Suspense } from "react";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Dashboard — WYST",
  description: "Manage your points, listings, and swaps.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-zinc-500">Loading...</div>}>
        <Dashboard />
      </Suspense>
      <Footer />
    </div>
  );
}
