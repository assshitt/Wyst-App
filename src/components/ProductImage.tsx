"use client";

import { useEffect, useRef, useState } from "react";
import { GarmentArt } from "@/components/Icon";
import type { GarmentKind } from "@/lib/listings";

/**
 * Item photo with a branded fallback. If there is no photo, or it fails to
 * load, an outlined garment on the WYST grid is shown instead of a broken image.
 */
export default function ProductImage({
  src,
  alt,
  kind,
  tone = 0,
  eager = false,
}: {
  src: string;
  alt: string;
  kind: GarmentKind;
  tone?: number;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(false);
    const img = ref.current;
    // Catches images that errored before React attached the onError handler.
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  const showPhoto = src !== "" && !failed;

  return (
    <div className="pimg">
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`pimg-fallback tone-${Math.abs(tone) % 4}`} role="img" aria-label={alt}>
          <GarmentArt kind={kind} />
        </div>
      )}
    </div>
  );
}
