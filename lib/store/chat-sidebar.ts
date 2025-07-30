import { create } from "zustand";

export enum ChatVariant {
  PARTY_CHAT = "PARTY_CHAT",
  ADVENTURERS = "ADVENTURERS",
}

interface ChatSidebarStore {
  isCollapsed: boolean;
  variant: ChatVariant;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  isCollapsed: false,
  variant: ChatVariant.PARTY_CHAT,
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}));
