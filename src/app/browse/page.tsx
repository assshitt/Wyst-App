import BrowsePage from "@/components/BrowsePage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Browse — WYST",
  description: "Browse clothing swaps and spend your points.",
};

export default function Browse() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <BrowsePage />
      <Footer />
    </div>
  );
}
