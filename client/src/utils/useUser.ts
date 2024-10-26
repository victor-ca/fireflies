import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string;
  changeUser: (userId: string) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: localStorage.getItem("userId") ?? "user4",
      changeUser: (userId: string) => set({ userId }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
