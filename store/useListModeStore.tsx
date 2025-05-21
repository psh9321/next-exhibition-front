"use client"

import { create } from "zustand"

interface LIST_MODE_INTERFACE {
    listMode : "Dual" | "Single",
    toggleListMode : () => void
}

export const useListModeStore = create<LIST_MODE_INTERFACE>((set, get) => ({
    listMode : "Dual",

    toggleListMode() {

        const current = get().listMode;

        set({
            listMode : current === "Dual" ? "Single" : "Dual"
        })
    }
}))