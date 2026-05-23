import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export const metadata = {
  title: "Upload — WYST",
  description: "List clothes and earn points on WYST.",
};

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <UploadForm />
      <Footer />
    </div>
  );
}
