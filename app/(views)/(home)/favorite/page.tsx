import { redirect } from "next/navigation";

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import FavoritePageView from "./_view";

import { API_SERVER_FAVORITE_LIST } from "@/api/favorite.server";

import { getToken, deleteToken } from "@/util/token";

import { FAVORITE_RESPONSE } from "@/types/favorite"

const FavoritePageServer = async () => {
    const queryServer = new QueryClient();

    const token = await getToken();

    if(token) {

        const favoriteList = await API_SERVER_FAVORITE_LIST(token) as FAVORITE_RESPONSE;

        if(favoriteList["resultCode"] === 200) {
            await queryServer.prefetchQuery({
                queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"]],
                queryFn : () => Promise.resolve(favoriteList["data"]),
            });
        } 
        else {
            await deleteToken();
            return redirect("/");
        }
    }

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <FavoritePageView/>        
        </HydrationBoundary>
    )
}

export default FavoritePageServer