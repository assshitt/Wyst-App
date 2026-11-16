import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEMO_LISTINGS,
  DEMO_NOTICES,
  DEMO_SWAPS,
  DEMO_THREADS,
  DEMO_TXNS,
  type MyListing,
  type Notice,
  type Swap,
  type Thread,
  type Txn,
} from "@/lib/demo";
import type { Condition, GarmentKind, Listing, SwapMode } from "@/lib/listings";

export type User = {
  name: string;
  username: string;
  email: string;
  college: string;
  city: string;
};

export type Prefs = {
  swapAlerts: boolean;
  messageAlerts: boolean;
  weeklyDigest: boolean;
  publicProfile: boolean;
};

export type NewListingInput = {
  title: string;
  brand: string;
  size: string;
  condition: Condition;
  kind: GarmentKind;
  points: number;
  image: string;
};

export type SwapResult = "ok" | "insufficient" | "duplicate" | "signed-out";

type UserStore = {
  hydrated: boolean;
  user: User | null;
  points: number;
  wishlist: number[];
  swaps: Swap[];
  txns: Txn[];
  myListings: MyListing[];
  threads: Thread[];
  notices: Notice[];
  prefs: Prefs;
  toast: string | null;

  markHydrated: () => void;
  signInDemo: (email: string) => void;
  signUp: (input: { username: string; email: string; college: string }) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<User>) => void;
  setPref: (key: keyof Prefs, value: boolean) => void;

  toggleWishlist: (id: number) => void;
  requestSwap: (listing: Listing, mode: SwapMode, place: string) => SwapResult;
  cancelSwap: (id: string) => void;
  respondSwap: (id: string, accept: boolean) => void;
  completeSwap: (id: string) => void;

  addListing: (input: NewListingInput) => void;
  removeListing: (id: string) => void;

  sendMessage: (threadId: string, text: string) => void;
  openThread: (threadId: string) => void;
  markNoticesRead: () => void;

  showToast: (message: string) => void;
  clearToast: () => void;
};

const DEFAULT_PREFS: Prefs = {
  swapAlerts: true,
  messageAlerts: true,
  weeklyDigest: false,
  publicProfile: true,
};

const EMPTY_ACCOUNT = {
  user: null,
  points: 0,
  wishlist: [] as number[],
  swaps: [] as Swap[],
  txns: [] as Txn[],
  myListings: [] as MyListing[],
  threads: [] as Thread[],
  notices: [] as Notice[],
  prefs: DEFAULT_PREFS,
};

function uid(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}`;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "you";
  const first = local.split(/[._\-+0-9]/).filter(Boolean)[0] || local;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...EMPTY_ACCOUNT,
      toast: null,

      markHydrated: () => set({ hydrated: true }),

      signInDemo: (email) => {
        const clean = email.trim() || "you@college.edu";
        set({
          user: {
            name: nameFromEmail(clean),
            username: clean.split("@")[0] || "you",
            email: clean,
            college: "IIT Delhi",
            city: "New Delhi",
          },
          points: 360,
          wishlist: [3, 9],
          swaps: DEMO_SWAPS,
          txns: [
            { id: "t0", label: "Swap completed", detail: "Denim Shirt → rohan_v", amount: 175, when: "10 Nov" },
            ...DEMO_TXNS,
            { id: "t7", label: "Swap bonus", detail: "First swap completed", amount: 25, when: "28 Oct" },
          ],
          myListings: DEMO_LISTINGS,
          threads: DEMO_THREADS,
          notices: DEMO_NOTICES,
          prefs: DEFAULT_PREFS,
        });
      },

      signUp: ({ username, email, college }) => {
        const handle = username.trim() || email.split("@")[0] || "you";
        set({
          ...EMPTY_ACCOUNT,
          user: {
            name: handle,
            username: handle,
            email: email.trim(),
            college: college.trim(),
            city: "",
          },
          points: 100,
          txns: [
            { id: "t-welcome", label: "Welcome bonus", detail: "Thanks for joining WYST", amount: 100, when: "Just now" },
          ],
          notices: [
            {
              id: "n-welcome",
              kind: "points",
              title: "Welcome to WYST — 100 pts added",
              body: "List your first item to earn 50 more.",
              when: "Just now",
              href: "/upload",
              read: false,
            },
          ],
        });
      },

      signOut: () => set({ ...EMPTY_ACCOUNT }),

      updateProfile: (patch) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, ...patch } });
      },

      setPref: (key, value) => set({ prefs: { ...get().prefs, [key]: value } }),

      toggleWishlist: (id) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.includes(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id],
        });
      },

      requestSwap: (listing, mode, place) => {
        const { user, points, swaps, txns } = get();
        if (!user) return "signed-out";
        const open = swaps.some(
          (s) =>
            s.listingId === listing.id &&
            s.direction === "outgoing" &&
            (s.status === "pending" || s.status === "accepted")
        );
        if (open) return "duplicate";
        if (points < listing.points) return "insufficient";
        set({
          points: points - listing.points,
          swaps: [
            {
              id: uid("s"),
              listingId: listing.id,
              title: listing.title,
              image: listing.image,
              kind: listing.kind,
              points: listing.points,
              direction: "outgoing",
              person: listing.seller,
              mode,
              status: "pending",
              when: "Just now",
              place,
            },
            ...swaps,
          ],
          txns: [
            {
              id: uid("t"),
              label: "Points held",
              detail: `${listing.title} request`,
              amount: -listing.points,
              when: "Just now",
            },
            ...txns,
          ],
        });
        return "ok";
      },

      cancelSwap: (id) => {
        const { swaps, points, txns } = get();
        const swap = swaps.find((s) => s.id === id);
        if (!swap || swap.direction !== "outgoing") return;
        if (swap.status !== "pending" && swap.status !== "accepted") return;
        set({
          points: points + swap.points,
          swaps: swaps.map((s) => (s.id === id ? { ...s, status: "cancelled" as const } : s)),
          txns: [
            {
              id: uid("t"),
              label: "Points returned",
              detail: `${swap.title} request cancelled`,
              amount: swap.points,
              when: "Just now",
            },
            ...txns,
          ],
        });
      },

      respondSwap: (id, accept) => {
        set({
          swaps: get().swaps.map((s) =>
            s.id === id && s.direction === "incoming" && s.status === "pending"
              ? { ...s, status: accept ? ("accepted" as const) : ("declined" as const) }
              : s
          ),
        });
      },

      completeSwap: (id) => {
        const { swaps, points, txns, myListings } = get();
        const swap = swaps.find((s) => s.id === id);
        if (!swap || swap.status !== "accepted") return;
        const incoming = swap.direction === "incoming";
        const earned = incoming ? swap.points + 25 : 25;
        const now = Date.now().toString(36);
        const added: Txn[] = [
          { id: `tb${now}`, label: "Swap bonus", detail: swap.title, amount: 25, when: "Just now" },
        ];
        if (incoming) {
          added.push({
            id: `tc${now}`,
            label: "Swap completed",
            detail: `${swap.title} → ${swap.person}`,
            amount: swap.points,
            when: "Just now",
          });
        }
        set({
          points: points + earned,
          swaps: swaps.map((s) => (s.id === id ? { ...s, status: "completed" as const } : s)),
          txns: [...added, ...txns],
          myListings: incoming
            ? myListings.map((m) => (m.title === swap.title ? { ...m, status: "swapped" as const } : m))
            : myListings,
        });
      },

      addListing: (input) => {
        const { myListings, notices } = get();
        set({
          myListings: [
            { id: uid("m"), ...input, status: "review", views: 0, saves: 0 },
            ...myListings,
          ],
          notices: [
            {
              id: uid("n"),
              kind: "verify",
              title: `${input.title} is in review`,
              body: "We usually verify listings within a day. You earn 50 pts once it is live.",
              when: "Just now",
              href: "/dashboard/listings",
              read: false,
            },
            ...notices,
          ],
        });
      },

      removeListing: (id) => set({ myListings: get().myListings.filter((m) => m.id !== id) }),

      sendMessage: (threadId, text) => {
        const body = text.trim();
        if (!body) return;
        set({
          threads: get().threads.map((t) =>
            t.id === threadId
              ? { ...t, messages: [...t.messages, { from: "me" as const, text: body, time: "Just now" }] }
              : t
          ),
        });
      },

      openThread: (threadId) => {
        const { threads } = get();
        const thread = threads.find((t) => t.id === threadId);
        if (!thread || thread.unread === 0) return;
        set({ threads: threads.map((t) => (t.id === threadId ? { ...t, unread: 0 } : t)) });
      },

      markNoticesRead: () => {
        const { notices } = get();
        if (!notices.some((n) => !n.read)) return;
        set({ notices: notices.map((n) => ({ ...n, read: true })) });
      },

      showToast: (message) => set({ toast: message }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: "wyst-account-v2",
      skipHydration: true,
      partialize: (state) => ({
        user: state.user,
        points: state.points,
        wishlist: state.wishlist,
        swaps: state.swaps,
        txns: state.txns,
        myListings: state.myListings,
        threads: state.threads,
        notices: state.notices,
        prefs: state.prefs,
      }),
    }
  )
);
