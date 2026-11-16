import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import ListingDetail from "@/components/ListingDetail";
import { getListingById, getSimilarListings, LISTINGS } from "@/lib/listings";

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ id: String(listing.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(Number(id));
  if (!listing) return { title: "Listing not found" };
  return {
    title: listing.title,
    description: `${listing.title} by ${listing.brand}, size ${listing.size}. ${listing.points} points on WYST.`,
  };
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = getListingById(Number(id));

  if (!listing) notFound();

  return (
    <AppShell>
      <ListingDetail listing={listing} similar={getSimilarListings(listing.id)} />
    </AppShell>
  );
}
