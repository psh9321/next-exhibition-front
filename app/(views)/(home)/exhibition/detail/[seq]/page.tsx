
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ExhibitionDetailPageView from "./_view"

import { API_EXHIBITION_DETAIL } from "@/api/openApi.server"
import { API_SERVER_MEETING_EXHIBITION_LIST_TARGET } from "@/api/meeting.server"

import { EXHIBITION_API_DETAIL_RESPONSE } from "@/types/exhibition"
import { MEETING_EXHIBITION_TARGET_LIST_RESPONSE } from "@/types/meeting"

interface SERVER_LAYOUT {
    params : { seq : string }
}

const ExhibitionDetailPageServer = async ({params} : SERVER_LAYOUT) => {
    const { seq } = params;

    const queryServer = new QueryClient();

    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq],
        queryFn : async () => {

            const result = await API_EXHIBITION_DETAIL(seq) as EXHIBITION_API_DETAIL_RESPONSE;

            if(result["resultCode"] !== 200) return null

            return result["data"]
        },
    });

    await queryServer.prefetchInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], `target-list-${seq}`],
        queryFn : async () => {
            const result = await API_SERVER_MEETING_EXHIBITION_LIST_TARGET(seq, 0, 20) as MEETING_EXHIBITION_TARGET_LIST_RESPONSE;

            return result["data"]
        },
        initialPageParam : 0
    })


    const dehydratedState = dehydrate(queryServer);
    
    return (
        <HydrationBoundary state={dehydratedState}>
            <ExhibitionDetailPageView params={{seq}}/>
        </HydrationBoundary>
    )
}

export default ExhibitionDetailPageServer