"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import ListingCard from "@/components/ListingCard";
import { LISTINGS } from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

export default function WishlistView() {
  const wishlist = useUserStore((s) => s.wishlist);
  const saved = LISTINGS.filter((listing) => wishlist.includes(listing.id));

  return (
    <>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <span className="eyebrow">Wishlist</span>
          <h1 style={{ marginTop: 10 }}>Saved items</h1>
          <p>
            {saved.length === 0 ? "Tap the heart on any item to keep it here." : `${saved.length} saved for later.`}
          </p>
        </div>
      </div>

      {saved.length > 0 ? (
        <div className="grid-cards">
          {saved.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-icon">
            <Icon name="heart" size={24} />
          </span>
          <h3>Your wishlist is empty</h3>
          <p>Save the pieces you like while you build up points.</p>
          <Link href="/browse" className="btn btn-primary">
            Browse the rack
          </Link>
        </div>
      )}
    </>
  );
}
