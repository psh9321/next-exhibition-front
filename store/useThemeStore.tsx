"use client"

import { create } from "zustand"

interface THEME_STORE {
    theme : "light" | "dark",
    ToggleTheme : () => void,

    InitTheme : () => void,
}

const STORAGE_NAME = process["env"]["NEXT_PUBLIC_STORAGE_THEME"] as string;

export const useThemeStore = create<THEME_STORE>((set, get) => ({
    theme : "light",

    ToggleTheme() {
        const { theme } = get();

        const resultTheme = theme === "light" ? "dark" : "light";

        localStorage.setItem(STORAGE_NAME as string, resultTheme)

        set({ theme : resultTheme });
    },

    InitTheme() {

        const _theme = localStorage.getItem(STORAGE_NAME as string) as "light" | "dark";

        set({ theme : _theme??"light" })
        
    }
}))