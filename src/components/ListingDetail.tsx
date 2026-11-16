"use client";

import Link from "next/link";
import { useState } from "react";
import { ConditionBadge } from "@/components/ConditionBadge";
import { Icon } from "@/components/Icon";
import ListingCard from "@/components/ListingCard";
import ProductImage from "@/components/ProductImage";
import { CONDITION_NOTES, formatRupees, type Listing, type SwapMode } from "@/lib/listings";
import { useUserStore, type SwapResult } from "@/store/userStore";

const SPOTS = ["Central library gate", "Main canteen", "Student activity centre", "Metro station exit"];

export default function ListingDetail({ listing, similar }: { listing: Listing; similar: Listing[] }) {
  const hydrated = useUserStore((s) => s.hydrated);
  const user = useUserStore((s) => s.user);
  const points = useUserStore((s) => s.points);
  const saved = useUserStore((s) => s.wishlist.includes(listing.id));
  const requested = useUserStore((s) =>
    s.swaps.some(
      (swap) =>
        swap.listingId === listing.id &&
        swap.direction === "outgoing" &&
        (swap.status === "pending" || swap.status === "accepted")
    )
  );
  const toggleWishlist = useUserStore((s) => s.toggleWishlist);
  const requestSwap = useUserStore((s) => s.requestSwap);
  const showToast = useUserStore((s) => s.showToast);

  const [mode, setMode] = useState<SwapMode>(listing.modes[0]);
  const [spot, setSpot] = useState(SPOTS[0]);
  const [result, setResult] = useState<SwapResult | null>(null);

  const shortBy = listing.points - points;

  const onRequest = () => {
    const place = mode === "meetup" ? `${spot} · time to be agreed in chat` : "WYST Verified delivery";
    const outcome = requestSwap(listing, mode, place);
    setResult(outcome);
    if (outcome === "ok") showToast(`Request sent to @${listing.seller}`);
  };

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/browse">Browse</Link>
        <Icon name="chevron-right" size={14} />
        <span>{listing.category}</span>
        <Icon name="chevron-right" size={14} />
        <span>{listing.title}</span>
      </nav>

      <div className="detail">
        <div className="gallery">
          <div className="gallery-main">
            <ProductImage src={listing.image} alt={listing.title} kind={listing.kind} tone={listing.id} eager />
          </div>
        </div>

        <div className="detail-info">
          <div className="row gap-8 wrap-flex">
            <span className="eyebrow">{listing.brand}</span>
            <ConditionBadge condition={listing.condition} />
            {listing.verified && (
              <span className="pill pill-blue">
                <Icon name="shield" size={13} /> Verified seller
              </span>
            )}
          </div>
          <h1>{listing.title}</h1>

          <div className="price-row">
            <span className="points">
              {listing.points} <small>PTS</small>
            </span>
            <span className="muted">
              Retail <s>{formatRupees(listing.originalPrice)}</s>
            </span>
          </div>

          <dl className="spec-grid">
            <div>
              <dt>Size</dt>
              <dd>{listing.size}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{listing.condition}</dd>
            </div>
            <div>
              <dt>Colour</dt>
              <dd>{listing.color}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{listing.category}</dd>
            </div>
          </dl>

          <div className="swapbox">
            <div className="balance-line">
              <span>Your balance</span>
              <span className="points">{hydrated && user ? `${points} PTS` : "—"}</span>
            </div>

            {listing.modes.length > 1 ? (
              <div className="segmented segmented-block" role="group" aria-label="Swap type">
                <button
                  type="button"
                  className={mode === "meetup" ? "is-active" : undefined}
                  aria-pressed={mode === "meetup"}
                  onClick={() => setMode("meetup")}
                >
                  Campus meetup
                </button>
                <button
                  type="button"
                  className={mode === "delivery" ? "is-active" : undefined}
                  aria-pressed={mode === "delivery"}
                  onClick={() => setMode("delivery")}
                >
                  Verified delivery
                </button>
              </div>
            ) : (
              <span className={mode === "meetup" ? "pill pill-green" : "pill pill-blue"}>
                <Icon name={mode === "meetup" ? "users" : "truck"} size={13} />
                {mode === "meetup" ? "Campus meetup only" : "Verified delivery only"}
              </span>
            )}

            {mode === "meetup" ? (
              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="spot">Suggested meetup spot</label>
                <select id="spot" className="select" value={spot} onChange={(event) => setSpot(event.target.value)}>
                  {SPOTS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="hint" style={{ marginTop: 14 }}>
                We collect the item, check hygiene and condition, then deliver it with tracking.
              </p>
            )}

            {requested || result === "ok" ? (
              <div className="notice" style={{ marginTop: 16 }} role="status">
                <Icon name="check" size={18} strokeWidth={2.2} />
                <div>
                  Request sent. {listing.points} points are held until @{listing.seller} responds.{" "}
                  <Link href="/dashboard/swaps" className="link">
                    View your swaps
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {result === "insufficient" && (
                  <div className="notice is-blue" style={{ marginTop: 16 }} role="alert">
                    <Icon name="info" size={18} />
                    <div>
                      You need {shortBy} more points for this item.{" "}
                      <Link href="/upload" className="link">
                        List something to earn them
                      </Link>
                    </div>
                  </div>
                )}
                <div className="actions">
                  {hydrated && !user ? (
                    <Link href="/login" className="btn btn-primary btn-lg grow">
                      Log in to request
                    </Link>
                  ) : (
                    <button type="button" className="btn btn-primary btn-lg grow" onClick={onRequest}>
                      Request swap · {listing.points} pts
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    aria-pressed={saved}
                    onClick={() => {
                      toggleWishlist(listing.id);
                      showToast(saved ? "Removed from wishlist" : "Saved to wishlist");
                    }}
                  >
                    <Icon name="heart" size={18} className={saved ? "text-green" : undefined} />
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="seller-card">
            <span className="avatar avatar-alt">{listing.seller.slice(0, 2)}</span>
            <div className="grow">
              <strong>
                @{listing.seller}
                {listing.verified && <Icon name="shield" size={15} className="text-blue" />}
              </strong>
              <span>
                {listing.campus} · Listed {listing.posted}
              </span>
            </div>
            <span className="pill">
              <Icon name="star" size={13} className="text-green" />
              {listing.rating.toFixed(1)} ({listing.reviews})
            </span>
          </div>

          <div className="acc">
            <details open>
              <summary>
                Description <Icon name="chevron-down" size={18} />
              </summary>
              <div className="acc-body">
                <p>{listing.description}</p>
                <p>
                  Condition: {listing.condition} — {CONDITION_NOTES[listing.condition].toLowerCase()}.
                </p>
              </div>
            </details>
            <details>
              <summary>
                How this swap works <Icon name="chevron-down" size={18} />
              </summary>
              <div className="acc-body">
                <p>
                  Your points are held when you send a request. If the owner declines, or you cancel, they return
                  to your wallet straight away.
                </p>
                <p>Once you both confirm the handover, the points move to the owner and you each earn a 25 point bonus.</p>
              </div>
            </details>
            <details>
              <summary>
                Safety and returns <Icon name="chevron-down" size={18} />
              </summary>
              <div className="acc-body">
                <p>Meet in public campus spots during the day, and check the item before you confirm.</p>
                <p>
                  For delivery swaps, report a size or condition mismatch and your points are returned once the item
                  is sent back.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section style={{ marginTop: 72 }}>
          <div className="section-head is-split" style={{ marginBottom: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 26 }}>You might also like</h2>
            <Link href="/browse" className="link-arrow">
              Browse everything <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="grid-cards is-4">
            {similar.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
