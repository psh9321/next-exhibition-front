"use client"

import { useState } from "react"

import loadingViewStyles from "@/styles/loadingView.module.css"
import { useThemeStore } from "@/store/useThemeStore";

export const useLoadingView = () => {

    const [isActive, setIsActive] = useState<boolean>(false);

    const { theme } = useThemeStore();

    function ShowLoadingView(){ setIsActive(true) };

    function HideLoadingView(){ setIsActive(false) };

    const LoadingElement = () => {

        if(!isActive) return <></>;

        return (
            <div className={`${loadingViewStyles.loadingView} ${loadingViewStyles[theme]}`}>
                <div className={loadingViewStyles.icon}></div>
            </div>
        )
    }

    return { LoadingElement, ShowLoadingView, HideLoadingView }
}