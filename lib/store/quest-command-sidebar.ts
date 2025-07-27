import { create } from "zustand";

interface QuestCommandSidebarStore {
  isCollapsed: boolean;
  activeSection: string;
  toggleCollapse: () => void;
  setActiveSection: (section: string) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useQuestCommandSidebar = create<QuestCommandSidebarStore>(
  (set) => ({
    isCollapsed: false,
    activeSection: "home",
    toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    setActiveSection: (section) => set({ activeSection: section }),
    setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  }),
);
