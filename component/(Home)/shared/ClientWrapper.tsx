"use client"

import { useLayoutEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import Headers from "./Headers"
import SideMenu from "./SideMenu"
import BottomMenu from "./BottomMenu"

import { useUserInfoStore } from "@/store/useQueryStore"
import { useThemeStore } from "@/store/useThemeStore"

import { USER_INFO } from "@/types/user"
import { MEETING_PROMISE_RESPONSE_DATA } from "@/types/meeting"
import { FAVORITE_RESPONSE_DATA } from "@/types/favorite"
import { MESSAGE_ROOM_RESPONSE_DATA } from "@/types/message"
import { LAYOUT_CHILD } from "@/types/component"

import wrapperStyles from "@/styles/(home)/shared/wrapper.module.css"



const ClientWrapper = ({children} : LAYOUT_CHILD) => {

    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(true);

    const { 
        SetUserInfoQuery, 
        SetFavoriteQuery, 
        SetPromiseQuery,
        SetMessageQuery,
        userInfoQuery,
        favoriteQuery,
        promiseQuery,
        messageQuery,
    } = useUserInfoStore();

    const { theme } = useThemeStore();

    const userInfoClientQuery = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_USER_INFO"]]) as USER_INFO;
    
    const promiseClientQuery = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"],"promise"]) as MEETING_PROMISE_RESPONSE_DATA;

    const favoriteClientQuery = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"]]) as FAVORITE_RESPONSE_DATA;

    const messageClientQuery = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"],"rooms"]) as MESSAGE_ROOM_RESPONSE_DATA[]
    
    useLayoutEffect(() => {
        
        if(userInfoClientQuery && !userInfoQuery) SetUserInfoQuery(userInfoClientQuery);
        if(promiseClientQuery && !promiseQuery) SetPromiseQuery(promiseClientQuery);
        if(favoriteClientQuery && !favoriteQuery) SetFavoriteQuery(favoriteClientQuery);
        if(messageClientQuery && !messageQuery) SetMessageQuery(messageClientQuery)
        setIsLoading(false);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if(isLoading) return <></>
    
    return (
        <div id={wrapperStyles.wrapper} className={wrapperStyles[theme]}>
            <Headers/>
            <main id={wrapperStyles.main}>
            <SideMenu/>
                <section id={wrapperStyles.section}>
                    {children}
                </section>
            </main>
            <BottomMenu/>
        </div>
    )
}

export default ClientWrapper