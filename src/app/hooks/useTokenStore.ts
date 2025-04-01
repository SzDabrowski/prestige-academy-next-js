import { create } from "zustand";

interface TokenStoreState {
  guestToken: string | null;
  setGuestToken: (token: string) => void;
}

export const useTokenStore = create<TokenStoreState>((set) => ({
  guestToken: null,
  setGuestToken: (token) => set({ guestToken: token }),
}));
