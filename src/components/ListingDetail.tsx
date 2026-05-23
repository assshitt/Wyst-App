"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ConditionBadge } from "@/components/ConditionBadge";
import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

export default function ListingDetail({
  listing,
  similar,
}: {
  listing: Listing;
  similar: Listing[];
}) {
  const [mainImage, setMainImage] = useState(listing.image);
  const [swapMode, setSwapMode] = useState<"meetup" | "delivery">("meetup");
  const [location, setLocation] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const points = useUserStore((s) => s.points);
  const toggleWishlist = useUserStore((s) => s.toggleWishlist);
  const isInWishlist = useUserStore((s) => s.isInWishlist(listing.id));

  const thumbs = [listing.image, listing.image, listing.image, listing.image];
  const savings = listing.originalPrice - listing.points * 10;

  const accordions = [
    {
      id: "description",
      title: "Description",
      content: listing.description ?? "No description provided.",
    },
    {
      id: "specs",
      title: "Item specifications",
      content: (
        <ul className="space-y-2 text-sm text-zinc-400">
          <li>
            <span className="text-zinc-500">Size:</span> {listing.size}
          </li>
          <li>
            <span className="text-zinc-500">Brand:</span> {listing.brand}
          </li>
          <li>
            <span className="text-zinc-500">Condition:</span> {listing.condition}
          </li>
          <li>
            <span className="text-zinc-500">Color:</span> {listing.color ?? "—"}
          </li>
        </ul>
      ),
    },
    {
      id: "swap",
      title: "Swap & delivery info",
      content:
        "Meetup swaps available within city limits. Delivery swaps ship within 3–5 days via partner courier. Points are held in escrow until both parties confirm.",
    },
    {
      id: "policy",
      title: "Seller's swap policy",
      content:
        "Item must match photos. 24-hour inspection window after meetup. No returns on Fair condition items unless misrepresented.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <p className="mt-2 text-center text-xs text-zinc-500">
            Hover to zoom · Tap thumbnails to switch
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {thumbs.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMainImage(src)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  mainImage === src ? "border-emerald-500" : "border-white/10"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">@{listing.seller}</span>
            {listing.verified && (
              <span className="text-emerald-400">✓ Verified</span>
            )}
            <span className="text-amber-400">★ {listing.rating}</span>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{listing.title}</h1>

          <div className="mt-4 border-b border-white/10 pb-6">
            <p className="text-4xl font-black text-[#22c55e] md:text-5xl">{listing.points} pts</p>
            <p className="mt-1 text-sm text-zinc-500">
              <span className="line-through">₹{listing.originalPrice.toLocaleString("en-IN")}</span>{" "}
              retail · Save ~{Math.max(savings, 0).toLocaleString("en-IN")} worth vs buying new
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ConditionBadge condition={listing.condition} size="md" />
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-300">
                Size {listing.size}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-red-400">Only 1 available</p>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
            <p className="text-sm text-zinc-400">
              You have: <span className="font-bold text-emerald-400">{points} pts</span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              This swap requires <span className="font-semibold text-white">{listing.points} pts</span>
            </p>

            <div className="mt-4 flex rounded-lg border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setSwapMode("meetup")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  swapMode === "meetup"
                    ? "bg-emerald-500 text-[#050505]"
                    : "text-zinc-400"
                }`}
              >
                Meetup swap
              </button>
              <button
                type="button"
                onClick={() => setSwapMode("delivery")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  swapMode === "delivery"
                    ? "bg-emerald-500 text-[#050505]"
                    : "text-zinc-400"
                }`}
              >
                Delivery swap
              </button>
            </div>

            {swapMode === "meetup" && (
              <input
                type="text"
                placeholder="Meetup location (e.g. Delhi University North Campus)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none"
              />
            )}

            <button
              type="button"
              className="mt-4 w-full rounded-lg bg-[#22c55e] py-3.5 text-base font-bold text-[#050505] transition-colors hover:bg-emerald-400"
            >
              Request Swap · {listing.points} pts
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(listing.id)}
              className="mt-3 w-full rounded-lg border border-white/15 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5"
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-emerald-500 text-lg font-bold">
                {listing.seller[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">@{listing.seller}</p>
                {listing.verified && (
                  <p className="text-xs text-emerald-400">Verified seller</p>
                )}
                <p className="text-sm text-zinc-400">
                  4.8 ★ · 124 swaps · Member since Jan 2024
                </p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="mt-4 block w-full rounded-lg border border-white/10 py-2 text-center text-sm font-medium text-zinc-300 hover:bg-white/5"
            >
              View Profile
            </Link>
          </div>

          <div className="mt-6 space-y-2">
            {accordions.map((acc) => (
              <div key={acc.id} className="rounded-lg border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === acc.id ? null : acc.id)
                  }
                  className="flex w-full items-center justify-between bg-white/[0.03] px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  {acc.title}
                  <span className="text-zinc-500">
                    {openAccordion === acc.id ? "−" : "+"}
                  </span>
                </button>
                {openAccordion === acc.id && (
                  <div className="border-t border-white/10 px-4 py-3 text-sm text-zinc-400">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-4 text-xl font-bold text-white">Similar items</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {similar.map((item) => (
            <div key={item.id} className="w-64 shrink-0">
              <ListingCard listing={item} showUrgency={false} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
