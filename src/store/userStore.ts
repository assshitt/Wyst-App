import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  college?: string;
};

type UserStore = {
  user: User | null;
  points: number;
  wishlist: number[];
  setUser: (user: User | null) => void;
  setPoints: (points: number) => void;
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: {
    id: "1",
    name: "You",
    email: "you@wyst.app",
  },
  points: 250,
  wishlist: [],

  setUser: (user) => set({ user }),
  setPoints: (points) => set({ points }),

  addToWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist
        : [...state.wishlist, id],
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((itemId) => itemId !== id),
    })),

  toggleWishlist: (id) => {
    const { wishlist, addToWishlist, removeFromWishlist } = get();
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  },

  isInWishlist: (id) => get().wishlist.includes(id),
}));
