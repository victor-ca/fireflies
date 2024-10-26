import { create } from "zustand";

interface UserState {
  userId: string;
  changeUser: (userId: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: "user4",
  changeUser: (userId: string) => set({ userId }),
}));

export default useUserStore;
