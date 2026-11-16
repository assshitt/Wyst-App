"use client";

import Link from "next/link";
import { ConditionBadge } from "@/components/ConditionBadge";
import { Icon } from "@/components/Icon";
import ProductImage from "@/components/ProductImage";
import { formatRupees, type Listing } from "@/lib/listings";
import { useUserStore } from "@/store/userStore";

export default function ListingCard({ listing }: { listing: Listing }) {
  const saved = useUserStore((s) => s.wishlist.includes(listing.id));
  const toggleWishlist = useUserStore((s) => s.toggleWishlist);
  const showToast = useUserStore((s) => s.showToast);

  return (
    <article className="lcard">
      <div className="lcard-media">
        <ProductImage src={listing.image} alt={listing.title} kind={listing.kind} tone={listing.id} />
        <div className="lcard-tags">
          <ConditionBadge condition={listing.condition} solid />
        </div>
        <button
          type="button"
          className={saved ? "lcard-save is-on" : "lcard-save"}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${listing.title} from wishlist` : `Save ${listing.title} to wishlist`}
          onClick={() => {
            toggleWishlist(listing.id);
            showToast(saved ? "Removed from wishlist" : "Saved to wishlist");
          }}
        >
          <Icon name="heart" size={17} />
        </button>
      </div>
      <div className="lcard-body">
        <div className="lcard-brand">
          <span>{listing.brand}</span>
          <span>Size {listing.size}</span>
        </div>
        <h3 className="lcard-title">
          <Link href={`/listing/${listing.id}`}>{listing.title}</Link>
        </h3>
        <div className="lcard-meta">
          <span>{listing.campus}</span>
          <i />
          <span>{listing.posted}</span>
        </div>
        <div className="lcard-foot">
          <div>
            <span className="points">
              {listing.points} <small>PTS</small>
            </span>
            <div className="worth">Retail {formatRupees(listing.originalPrice)}</div>
          </div>
          <span className="seller">
            {listing.verified && <Icon name="shield" size={14} />}@{listing.seller}
          </span>
        </div>
      </div>
    </article>
  );
}
