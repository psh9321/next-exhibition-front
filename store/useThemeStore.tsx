"use client"

import { create } from "zustand"

interface THEME_STORE {
    theme : "light" | "dark",
    SetTheme : (themeStr : string) => void
    GetTheme : () => "light" | "dark"
}

export const useThemeStore = create<THEME_STORE>((set, get) => ({
    theme : "light",

    SetTheme(themeStr) {

    },

    GetTheme(){
        
        return "dark"
    }
}))