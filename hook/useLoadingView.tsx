"use client"

import { useState } from "react"

import loadingViewStyles from "@/styles/loadingView.module.css"

export const useLoadingView = () => {

    const [isActive, setIsActive] = useState<boolean>(false);

    function ShowLoadingView(){ setIsActive(true) };

    function HideLoadingView(){ setIsActive(false) };

    const LoadingElement = () => {

        if(!isActive) return <></>;

        return (
            <div className={loadingViewStyles.loadingView}>
                <div className={loadingViewStyles.icon}></div>
            </div>
        )
    }

    return { LoadingElement, ShowLoadingView, HideLoadingView }
}