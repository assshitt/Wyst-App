import type { Condition, GarmentKind, SwapMode } from "@/lib/listings";

/* Sample activity shown for the demo account. A new sign-up starts empty. */

export type SwapStatus = "pending" | "accepted" | "declined" | "completed" | "cancelled";

export type Swap = {
  id: string;
  listingId: number | null;
  title: string;
  image: string;
  kind: GarmentKind;
  points: number;
  direction: "incoming" | "outgoing";
  person: string;
  mode: SwapMode;
  status: SwapStatus;
  when: string;
  place: string;
};

export type Txn = {
  id: string;
  label: string;
  detail: string;
  amount: number;
  when: string;
};

export type MyListing = {
  id: string;
  title: string;
  brand: string;
  size: string;
  condition: Condition;
  kind: GarmentKind;
  points: number;
  status: "live" | "review" | "swapped";
  image: string;
  views: number;
  saves: number;
};

export type ChatMessage = { from: "me" | "them"; text: string; time: string };

export type Thread = {
  id: string;
  person: string;
  about: string;
  unread: number;
  messages: ChatMessage[];
};

export type Notice = {
  id: string;
  kind: "swap" | "points" | "verify" | "message";
  title: string;
  body: string;
  when: string;
  href: string;
  read: boolean;
};

export const DEMO_SWAPS: Swap[] = [
  {
    id: "s1",
    listingId: null,
    title: "Uniqlo Linen Shirt",
    image: "",
    kind: "tee",
    points: 140,
    direction: "incoming",
    person: "meera_k",
    mode: "meetup",
    status: "pending",
    when: "Today",
    place: "Central library gate · Sat 4:00 PM",
  },
  {
    id: "s2",
    listingId: null,
    title: "Corduroy Overshirt",
    image: "",
    kind: "jacket",
    points: 190,
    direction: "incoming",
    person: "dev.arora",
    mode: "delivery",
    status: "pending",
    when: "Yesterday",
    place: "WYST Verified delivery",
  },
  {
    id: "s3",
    listingId: 5,
    title: "Adidas Track Jacket",
    image: "",
    kind: "jacket",
    points: 180,
    direction: "outgoing",
    person: "sporty_swaps",
    mode: "meetup",
    status: "accepted",
    when: "2d ago",
    place: "Dwarka Sec 10 metro · Sun 11:30 AM",
  },
  {
    id: "s4",
    listingId: null,
    title: "Wide-leg Trousers",
    image: "",
    kind: "pants",
    points: 130,
    direction: "incoming",
    person: "ananya.s",
    mode: "meetup",
    status: "completed",
    when: "Last week",
    place: "Hostel common room",
  },
];

export const DEMO_TXNS: Txn[] = [
  { id: "t1", label: "Swap completed", detail: "Wide-leg Trousers → ananya.s", amount: 130, when: "8 Nov" },
  { id: "t2", label: "Points held", detail: "Adidas Track Jacket request", amount: -180, when: "6 Nov" },
  { id: "t3", label: "Verified listing bonus", detail: "Corduroy Overshirt", amount: 50, when: "4 Nov" },
  { id: "t4", label: "5-star review", detail: "From ananya.s", amount: 10, when: "3 Nov" },
  { id: "t5", label: "Verified listing bonus", detail: "Uniqlo Linen Shirt", amount: 50, when: "1 Nov" },
  { id: "t6", label: "Welcome bonus", detail: "Thanks for joining WYST", amount: 100, when: "28 Oct" },
];

export const DEMO_LISTINGS: MyListing[] = [
  {
    id: "m1",
    title: "Uniqlo Linen Shirt",
    brand: "Uniqlo",
    size: "M",
    condition: "Like New",
    kind: "tee",
    points: 140,
    status: "live",
    image: "",
    views: 86,
    saves: 12,
  },
  {
    id: "m2",
    title: "Corduroy Overshirt",
    brand: "H&M",
    size: "L",
    condition: "Good",
    kind: "jacket",
    points: 190,
    status: "live",
    image: "",
    views: 54,
    saves: 7,
  },
  {
    id: "m3",
    title: "Knit Midi Skirt",
    brand: "Zara",
    size: "S",
    condition: "New",
    kind: "skirt",
    points: 160,
    status: "review",
    image: "",
    views: 0,
    saves: 0,
  },
  {
    id: "m4",
    title: "Wide-leg Trousers",
    brand: "Mango",
    size: "M",
    condition: "Good",
    kind: "pants",
    points: 130,
    status: "swapped",
    image: "",
    views: 121,
    saves: 19,
  },
];

export const DEMO_THREADS: Thread[] = [
  {
    id: "c1",
    person: "meera_k",
    about: "Uniqlo Linen Shirt",
    unread: 2,
    messages: [
      { from: "them", text: "Hi! Is the linen shirt still available?", time: "3:12 PM" },
      { from: "me", text: "Yes, it is. Barely worn, true to size.", time: "3:15 PM" },
      { from: "them", text: "Great. Can we meet at the central library gate on Saturday?", time: "3:16 PM" },
      { from: "them", text: "Around 4 works for me.", time: "3:16 PM" },
    ],
  },
  {
    id: "c2",
    person: "sporty_swaps",
    about: "Adidas Track Jacket",
    unread: 0,
    messages: [
      { from: "me", text: "Requested the track jacket. Is Sunday morning okay?", time: "Tue" },
      { from: "them", text: "Accepted. Dwarka Sec 10 metro, 11:30?", time: "Tue" },
      { from: "me", text: "Perfect, see you there.", time: "Tue" },
    ],
  },
  {
    id: "c3",
    person: "ananya.s",
    about: "Wide-leg Trousers",
    unread: 0,
    messages: [
      { from: "them", text: "Got the trousers, they fit perfectly. Thank you!", time: "8 Nov" },
      { from: "me", text: "So glad. Enjoy them!", time: "8 Nov" },
    ],
  },
];

export const DEMO_NOTICES: Notice[] = [
  {
    id: "n1",
    kind: "swap",
    title: "meera_k wants your Uniqlo Linen Shirt",
    body: "140 pts · Meetup at the central library gate",
    when: "12 min ago",
    href: "/dashboard/swaps",
    read: false,
  },
  {
    id: "n2",
    kind: "message",
    title: "2 new messages from meera_k",
    body: "“Around 4 works for me.”",
    when: "14 min ago",
    href: "/messages",
    read: false,
  },
  {
    id: "n3",
    kind: "swap",
    title: "sporty_swaps accepted your request",
    body: "Adidas Track Jacket · Sun 11:30 AM",
    when: "2d ago",
    href: "/dashboard/swaps",
    read: false,
  },
  {
    id: "n4",
    kind: "verify",
    title: "Corduroy Overshirt is verified",
    body: "Your listing is live and you earned 50 pts.",
    when: "4 Nov",
    href: "/dashboard/listings",
    read: true,
  },
  {
    id: "n5",
    kind: "points",
    title: "You earned 10 pts",
    body: "ananya.s left you a 5-star review.",
    when: "3 Nov",
    href: "/dashboard/wallet",
    read: true,
  },
];

export const EARN_RULES = [
  { title: "Join WYST", note: "One-time welcome bonus", points: 100 },
  { title: "List a verified item", note: "Credited once our check passes", points: 50 },
  { title: "Complete a swap", note: "For both people, every time", points: 25 },
  { title: "Get a 5-star review", note: "Good swappers get rewarded", points: 10 },
];

export const FAQS = [
  {
    q: "How do points work?",
    a: "Every item has a points value set by the person listing it, from 50 to 500. When someone takes your item, those points land in your wallet. You spend them on anything else on WYST. No cash changes hands.",
  },
  {
    q: "How do I know an item is clean and as described?",
    a: "Every listing is reviewed before it goes live. For delivery swaps, items pass a WYST Verified quality check for hygiene, condition and size before they are sent on. For meetups you inspect the item in person before confirming.",
  },
  {
    q: "What if the size doesn't fit?",
    a: "Listings show the tagged size and the lister's notes on fit. With a meetup you can check before confirming. With delivery, report a mismatch within 48 hours and your points are returned once the item is sent back.",
  },
  {
    q: "Is meeting a stranger safe?",
    a: "Meetups are arranged at public campus spots during the day, with students whose profiles are verified. Ratings are public, and you can report anyone from the swap screen.",
  },
  {
    q: "What happens to my points while a request is pending?",
    a: "They are held, not spent. If the owner declines or you cancel, they return to your wallet immediately.",
  },
  {
    q: "Does WYST cost anything?",
    a: "Swapping by meetup is free. WYST Verified delivery carries a small handling fee to cover pickup, the quality check and shipping.",
  },
];
