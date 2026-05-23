export type Condition = "New" | "Like New" | "Good" | "Fair";

export type Listing = {
  id: number;
  title: string;
  brand: string;
  size: string;
  condition: Condition;
  points: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  seller: string;
  verified: boolean;
  image: string;
  color?: string;
  description?: string;
};

/** Cycled across all 12 listings (id 1 → index 0, id 7 → index 0, etc.) */
export const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
] as const;

function listingImage(id: number): string {
  return PRODUCT_IMAGES[(id - 1) % PRODUCT_IMAGES.length];
}

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Nike Oversized Hoodie",
    brand: "Nike",
    size: "L",
    condition: "Like New",
    points: 150,
    originalPrice: 3500,
    rating: 4.5,
    reviews: 23,
    seller: "rahul_swaps",
    verified: true,
    image: listingImage(1),
    color: "Black",
    description:
      "Barely worn oversized Nike hoodie. Super soft fleece inside, perfect for layering. No stains or pilling.",
  },
  {
    id: 2,
    title: "Zara Floral Dress",
    brand: "Zara",
    size: "S",
    condition: "Good",
    points: 200,
    originalPrice: 4500,
    rating: 4.2,
    reviews: 18,
    seller: "priya_fashion",
    verified: true,
    image: listingImage(2),
    color: "Floral Print",
    description:
      "Flowy midi dress with a flattering fit. Worn a handful of times to brunches. Dry-cleaned and ready to swap.",
  },
  {
    id: 3,
    title: "Levi's 501 Jeans",
    brand: "Levis",
    size: "M",
    condition: "New",
    points: 250,
    originalPrice: 5000,
    rating: 4.8,
    reviews: 45,
    seller: "fashion_hub",
    verified: false,
    image: listingImage(3),
    color: "Indigo",
    description:
      "Classic straight-leg 501s with tags still attached. Never washed, crisp dark wash. Timeless everyday denim.",
  },
  {
    id: 4,
    title: "H&M Crop Top",
    brand: "H&M",
    size: "XS",
    condition: "Like New",
    points: 80,
    originalPrice: 1200,
    rating: 4.0,
    reviews: 12,
    seller: "style_swap",
    verified: true,
    image: listingImage(4),
    color: "White",
    description:
      "Ribbed crop top that pairs with everything high-waisted. Worn twice, like-new condition.",
  },
  {
    id: 5,
    title: "Adidas Track Jacket",
    brand: "Adidas",
    size: "M",
    condition: "Good",
    points: 180,
    originalPrice: 4000,
    rating: 4.3,
    reviews: 31,
    seller: "sporty_swaps",
    verified: true,
    image: listingImage(5),
    color: "Navy",
    description:
      "Retro track jacket with signature stripes. Light wear on cuffs, fully functional zipper.",
  },
  {
    id: 6,
    title: "Mango Blazer",
    brand: "Mango",
    size: "L",
    condition: "New",
    points: 300,
    originalPrice: 6500,
    rating: 4.7,
    reviews: 8,
    seller: "luxury_swap",
    verified: true,
    image: listingImage(6),
    color: "Charcoal",
    description:
      "Structured blazer for interviews or nights out. Never worn, tags on. Tailored silhouette.",
  },
  {
    id: 7,
    title: "Forever 21 Mini Skirt",
    brand: "Forever21",
    size: "S",
    condition: "Like New",
    points: 90,
    originalPrice: 1500,
    rating: 3.9,
    reviews: 22,
    seller: "cute_closet",
    verified: false,
    image: listingImage(7),
    color: "Plaid",
    description:
      "Y2K-inspired mini skirt with pleats. Fun weekend piece, minimal wear.",
  },
  {
    id: 8,
    title: "Puma Sweatpants",
    brand: "Puma",
    size: "XL",
    condition: "Good",
    points: 120,
    originalPrice: 2800,
    rating: 4.1,
    reviews: 17,
    seller: "comfy_swaps",
    verified: true,
    image: listingImage(8),
    color: "Grey",
    description:
      "Relaxed-fit sweatpants with tapered ankle. Cozy WFH essential, minor fading from washes.",
  },
  {
    id: 9,
    title: "Topshop Denim Jacket",
    brand: "Topshop",
    size: "M",
    condition: "New",
    points: 220,
    originalPrice: 4800,
    rating: 4.6,
    reviews: 39,
    seller: "denim_lover",
    verified: true,
    image: listingImage(9),
    color: "Light Wash",
    description:
      "Cropped denim jacket, brand new in packaging. Perfect transitional layer for campus fits.",
  },
  {
    id: 10,
    title: "Bershka Cargo Pants",
    brand: "Bershka",
    size: "L",
    condition: "Like New",
    points: 160,
    originalPrice: 3200,
    rating: 4.4,
    reviews: 28,
    seller: "cargo_crew",
    verified: false,
    image: listingImage(10),
    color: "Olive",
    description:
      "Utility cargo pants with adjustable cuffs. Streetwear staple, worn once for a shoot.",
  },
  {
    id: 11,
    title: "Urbanic Co-ord Set",
    brand: "Urbanic",
    size: "S",
    condition: "New",
    points: 280,
    originalPrice: 5500,
    rating: 4.9,
    reviews: 56,
    seller: "coord_queen",
    verified: true,
    image: listingImage(11),
    color: "Sage Green",
    description:
      "Matching top and skirt set, unworn with tags. Instant outfit for events — swap and slay.",
  },
  {
    id: 12,
    title: "Roadster Graphic Tee",
    brand: "Roadster",
    size: "M",
    condition: "Good",
    points: 70,
    originalPrice: 999,
    rating: 3.8,
    reviews: 14,
    seller: "casual_swap",
    verified: false,
    image: listingImage(12),
    color: "Vintage Black",
    description:
      "Soft graphic tee with faded print. Lived-in vintage vibe, no holes.",
  },
];

export function getListingById(id: number): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export function getSimilarListings(id: number, count = 4): Listing[] {
  return LISTINGS.filter((l) => l.id !== id).slice(0, count);
}

export const CONDITION_STYLES: Record<
  Condition,
  { bg: string; text: string; border: string }
> = {
  New: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  "Like New": {
    bg: "bg-blue-500/15",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  Good: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  Fair: {
    bg: "bg-orange-500/15",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
};
