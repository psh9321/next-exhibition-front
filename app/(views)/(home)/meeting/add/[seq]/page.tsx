import { redirect } from "next/navigation"

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import AddMettingPageView from "./_view"

import { API_EXHIBITION_DETAIL } from "@/api/openApi.server"
import { API_SERVER_AUTH } from "@/api/auth.server"

import { getToken, deleteToken } from "@/util/token"

import { ADD_METTING_PAGE_PARAMS } from "@/types/meeting"
import { AUTH_TOKEN_RESPONSE } from "@/types/auth"
import { EXHIBITION_API_DETAIL_RESPONSE } from "@/types/exhibition"

interface SERVER_LAYOUT {
    params : { seq : string }
}
const AddMeetingPageServer = async ({params} : SERVER_LAYOUT) => {

    const { seq } : ADD_METTING_PAGE_PARAMS = params;

    const token = await getToken();

    if(!token) return redirect("/"); 
    
    const isAuth = await API_SERVER_AUTH(token) as AUTH_TOKEN_RESPONSE;

    if(0 > isAuth["resultCode"]) {
        await deleteToken();
        return redirect("/");
    }

    const queryServer = new QueryClient();

    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq],
        queryFn : async () => {
            const result = await API_EXHIBITION_DETAIL(seq) as EXHIBITION_API_DETAIL_RESPONSE;

            return result["data"]
        },
    });

    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <AddMettingPageView seq={seq}/>
        </HydrationBoundary>
    )
}

export default AddMeetingPageServer