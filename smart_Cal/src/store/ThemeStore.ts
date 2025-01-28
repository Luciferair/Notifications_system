import { create } from "zustand";

type ThemeState = {
    isDark: boolean;
    setIsDark: (val: boolean) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    setIsDark: (val: boolean) => set({ isDark: val }),
}))