import { create } from "zustand";
import { persist } from "zustand/middleware";
interface TokenStoreState {
  guestToken: string | null;
  tokenExpiry: number | null;
  setGuestToken: (token: string) => void;
  clearToken: () => void;
  isTokenValid: () => boolean;
}
export const useTokenStore = create<TokenStoreState>()(
  persist(
    (set, get) => ({
      guestToken: null,
      tokenExpiry: null,
      setGuestToken: (token) => {
        const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        set({ guestToken: token, tokenExpiry: expiry });
      },
      clearToken: () => set({ guestToken: null, tokenExpiry: null }),
      isTokenValid: () => {
        const { tokenExpiry } = get();
        return tokenExpiry ? Date.now() < tokenExpiry : false;
      },
    }),
    {
      name: "guest-token-storage",
      partialize: (state) => ({
        guestToken: state.guestToken,
        tokenExpiry: state.tokenExpiry,
      }),
    }
  )
);
