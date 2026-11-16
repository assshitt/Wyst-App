export type Condition = "New" | "Like New" | "Good" | "Fair";

export type Category = "Tops" | "Bottoms" | "Dresses" | "Outerwear";

export type GarmentKind = "tee" | "hoodie" | "jacket" | "dress" | "skirt" | "pants";

export type SwapMode = "meetup" | "delivery";

export type Listing = {
  id: number;
  title: string;
  brand: string;
  category: Category;
  kind: GarmentKind;
  size: string;
  condition: Condition;
  points: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  seller: string;
  verified: boolean;
  campus: string;
  modes: SwapMode[];
  posted: string;
  image: string;
  color: string;
  description: string;
};

/** Placeholder photography. Replace with real item photos once uploads are wired to storage. */
const PHOTOS = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
] as const;

function photo(id: number): string {
  return PHOTOS[(id - 1) % PHOTOS.length];
}

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Nike Oversized Hoodie",
    brand: "Nike",
    category: "Tops",
    kind: "hoodie",
    size: "L",
    condition: "Like New",
    points: 150,
    originalPrice: 3500,
    rating: 4.5,
    reviews: 23,
    seller: "rahul_swaps",
    verified: true,
    campus: "Hauz Khas",
    modes: ["meetup", "delivery"],
    posted: "2h ago",
    image: photo(1),
    color: "Black",
    description:
      "Barely worn oversized hoodie. Soft fleece inside, perfect for layering. No stains or pilling.",
  },
  {
    id: 2,
    title: "Zara Floral Midi Dress",
    brand: "Zara",
    category: "Dresses",
    kind: "dress",
    size: "S",
    condition: "Good",
    points: 200,
    originalPrice: 4500,
    rating: 4.2,
    reviews: 18,
    seller: "priya_fashion",
    verified: true,
    campus: "North Campus",
    modes: ["meetup"],
    posted: "5h ago",
    image: photo(2),
    color: "Floral print",
    description:
      "Flowy midi dress with a flattering fit. Worn a handful of times, dry-cleaned and ready to swap.",
  },
  {
    id: 3,
    title: "Levi's 501 Jeans",
    brand: "Levi's",
    category: "Bottoms",
    kind: "pants",
    size: "M",
    condition: "New",
    points: 250,
    originalPrice: 5000,
    rating: 4.8,
    reviews: 45,
    seller: "fashion_hub",
    verified: false,
    campus: "Saket",
    modes: ["meetup", "delivery"],
    posted: "Yesterday",
    image: photo(3),
    color: "Indigo",
    description:
      "Classic straight-leg 501s with tags still attached. Never washed, crisp dark wash.",
  },
  {
    id: 4,
    title: "H&M Ribbed Crop Top",
    brand: "H&M",
    category: "Tops",
    kind: "tee",
    size: "XS",
    condition: "Like New",
    points: 80,
    originalPrice: 1200,
    rating: 4.0,
    reviews: 12,
    seller: "style_swap",
    verified: true,
    campus: "Hauz Khas",
    modes: ["meetup"],
    posted: "Yesterday",
    image: photo(4),
    color: "White",
    description: "Ribbed crop top that pairs with anything high-waisted. Worn twice.",
  },
  {
    id: 5,
    title: "Adidas Track Jacket",
    brand: "Adidas",
    category: "Outerwear",
    kind: "jacket",
    size: "M",
    condition: "Good",
    points: 180,
    originalPrice: 4000,
    rating: 4.3,
    reviews: 31,
    seller: "sporty_swaps",
    verified: true,
    campus: "Dwarka",
    modes: ["meetup", "delivery"],
    posted: "2d ago",
    image: photo(5),
    color: "Navy",
    description:
      "Retro track jacket with signature stripes. Light wear on the cuffs, zipper works perfectly.",
  },
  {
    id: 6,
    title: "Mango Structured Blazer",
    brand: "Mango",
    category: "Outerwear",
    kind: "jacket",
    size: "L",
    condition: "New",
    points: 300,
    originalPrice: 6500,
    rating: 4.7,
    reviews: 8,
    seller: "luxury_swap",
    verified: true,
    campus: "Saket",
    modes: ["delivery"],
    posted: "2d ago",
    image: photo(6),
    color: "Charcoal",
    description:
      "Structured blazer for interviews or nights out. Never worn, tags on, tailored silhouette.",
  },
  {
    id: 7,
    title: "Forever 21 Pleated Skirt",
    brand: "Forever 21",
    category: "Bottoms",
    kind: "skirt",
    size: "S",
    condition: "Like New",
    points: 90,
    originalPrice: 1500,
    rating: 3.9,
    reviews: 22,
    seller: "cute_closet",
    verified: false,
    campus: "North Campus",
    modes: ["meetup"],
    posted: "3d ago",
    image: photo(7),
    color: "Plaid",
    description: "Pleated mini skirt, a fun weekend piece with minimal wear.",
  },
  {
    id: 8,
    title: "Puma Tapered Sweatpants",
    brand: "Puma",
    category: "Bottoms",
    kind: "pants",
    size: "XL",
    condition: "Good",
    points: 120,
    originalPrice: 2800,
    rating: 4.1,
    reviews: 17,
    seller: "comfy_swaps",
    verified: true,
    campus: "Dwarka",
    modes: ["meetup", "delivery"],
    posted: "3d ago",
    image: photo(8),
    color: "Grey",
    description: "Relaxed-fit sweatpants with a tapered ankle. Minor fading from washes.",
  },
  {
    id: 9,
    title: "Topshop Denim Jacket",
    brand: "Topshop",
    category: "Outerwear",
    kind: "jacket",
    size: "M",
    condition: "New",
    points: 220,
    originalPrice: 4800,
    rating: 4.6,
    reviews: 39,
    seller: "denim_lover",
    verified: true,
    campus: "Hauz Khas",
    modes: ["meetup", "delivery"],
    posted: "4d ago",
    image: photo(9),
    color: "Light wash",
    description: "Cropped denim jacket, brand new in packaging. An easy transitional layer.",
  },
  {
    id: 10,
    title: "Bershka Cargo Pants",
    brand: "Bershka",
    category: "Bottoms",
    kind: "pants",
    size: "L",
    condition: "Like New",
    points: 160,
    originalPrice: 3200,
    rating: 4.4,
    reviews: 28,
    seller: "cargo_crew",
    verified: false,
    campus: "Saket",
    modes: ["meetup"],
    posted: "5d ago",
    image: photo(10),
    color: "Olive",
    description: "Utility cargo pants with adjustable cuffs. Worn once for a shoot.",
  },
  {
    id: 11,
    title: "Urbanic Co-ord Set",
    brand: "Urbanic",
    category: "Dresses",
    kind: "dress",
    size: "S",
    condition: "New",
    points: 280,
    originalPrice: 5500,
    rating: 4.9,
    reviews: 56,
    seller: "coord_queen",
    verified: true,
    campus: "North Campus",
    modes: ["meetup", "delivery"],
    posted: "6d ago",
    image: photo(11),
    color: "Sage green",
    description: "Matching top and skirt set, unworn with tags. An instant outfit for events.",
  },
  {
    id: 12,
    title: "Roadster Graphic Tee",
    brand: "Roadster",
    category: "Tops",
    kind: "tee",
    size: "M",
    condition: "Good",
    points: 70,
    originalPrice: 999,
    rating: 3.8,
    reviews: 14,
    seller: "casual_swap",
    verified: false,
    campus: "Dwarka",
    modes: ["meetup"],
    posted: "1w ago",
    image: photo(12),
    color: "Vintage black",
    description: "Soft graphic tee with a faded print. Lived-in feel, no holes.",
  },
];

export const CATEGORIES: Category[] = ["Tops", "Bottoms", "Dresses", "Outerwear"];
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const CONDITIONS: Condition[] = ["New", "Like New", "Good", "Fair"];

export const CONDITION_NOTES: Record<Condition, string> = {
  New: "Never worn, tags attached",
  "Like New": "Worn once or twice",
  Good: "Light wear, no damage",
  Fair: "Visible wear, fully usable",
};

/** Pill colour class for each condition (see globals.css). */
export const CONDITION_TONE: Record<Condition, string> = {
  New: "pill-green",
  "Like New": "pill-blue",
  Good: "pill-amber",
  Fair: "",
};

export function getListingById(id: number): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

export function getSimilarListings(id: number, count = 4): Listing[] {
  const current = getListingById(id);
  const others = LISTINGS.filter((l) => l.id !== id);
  if (!current) return others.slice(0, count);
  const same = others.filter((l) => l.category === current.category);
  const rest = others.filter((l) => l.category !== current.category);
  return [...same, ...rest].slice(0, count);
}

export function formatRupees(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
