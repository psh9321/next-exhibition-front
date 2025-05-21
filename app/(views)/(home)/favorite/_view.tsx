"use client"

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead";
import { useQueryClient } from "@tanstack/react-query";

import FavoriteData from "@/component/(Home)/data/favoriteData";

import { FAVORITE_RESPONSE_DATA } from "@/types/favorite"

const FavoritePageView = () => {

    const queryClient = useQueryClient();
    
    const favoriteQuery = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"]]) as FAVORITE_RESPONSE_DATA;
    
    return (
        <>
            <HeadTitle isDualBtn={true} isSearchBtn={true} title={`좋아요 한 전시 : ${favoriteQuery["total"]??0}`} />
            <FavoriteData/>
        </>
    )
}

export default FavoritePageView