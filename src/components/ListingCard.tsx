"use client";

import Image from "next/image";
import Link from "next/link";
import { ConditionBadge } from "@/components/ConditionBadge";
import type { Listing } from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1 text-xs text-zinc-400">
      <span className="text-amber-400">★</span>
      <span className="font-medium text-zinc-300">{rating}</span>
      <span>({reviews})</span>
    </div>
  );
}

export default function ListingCard({
  listing,
  showUrgency = true,
}: {
  listing: Listing;
  showUrgency?: boolean;
}) {
  const toggleWishlist = useUserStore((s) => s.toggleWishlist);
  const isInWishlist = useUserStore((s) => s.isInWishlist(listing.id));

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-all hover:border-white/20 hover:shadow-lg hover:shadow-emerald-500/5">
      <Link href={`/listing/${listing.id}`} className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {showUrgency && (
          <span className="absolute left-2 top-2 rounded-md bg-red-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Only 1 left!
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(listing.id);
          }}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-2 backdrop-blur-sm transition-colors hover:bg-black/80"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className={`h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : "text-white"}`}
            fill={isInWishlist ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="font-medium text-zinc-400">@{listing.seller}</span>
          {listing.verified && (
            <span className="inline-flex items-center gap-0.5 text-emerald-400">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </span>
          )}
        </div>

        <Link href={`/listing/${listing.id}`}>
          <h3 className="line-clamp-2 font-semibold text-white group-hover:text-emerald-400">
            {listing.title}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-zinc-500">{listing.brand}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-300">
            Size {listing.size}
          </span>
          <ConditionBadge condition={listing.condition} />
        </div>

        <div className="mt-3">
          <p className="text-2xl font-bold text-[#22c55e]">{listing.points} pts</p>
          <p className="text-xs text-zinc-500">
            <span className="line-through">₹{listing.originalPrice.toLocaleString("en-IN")}</span>
            <span className="ml-1 text-zinc-600">retail</span>
          </p>
        </div>

        <StarRating rating={listing.rating} reviews={listing.reviews} />

        <Link
          href={`/listing/${listing.id}`}
          className="mt-4 block w-full rounded-lg bg-[#22c55e] py-2.5 text-center text-sm font-bold text-[#050505] transition-colors hover:bg-emerald-400"
        >
          Quick Swap
        </Link>
      </div>
    </article>
  );
}
