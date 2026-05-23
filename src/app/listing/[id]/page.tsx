import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ListingDetail from "@/components/ListingDetail";
import Navbar from "@/components/Navbar";
import { getListingById, getSimilarListings, LISTINGS } from "@/lib/listings";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ id: String(l.id) }));
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(Number(id));

  if (!listing) notFound();

  const similar = getSimilarListings(listing.id);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <ListingDetail listing={listing} similar={similar} />
      <Footer />
    </div>
  );
}
