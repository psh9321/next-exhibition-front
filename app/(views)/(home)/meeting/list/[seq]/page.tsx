
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import MeetingTargetListView from "./_view"

import { API_SERVER_MEETING_EXHIBITION_LIST_TARGET, API_SERVER_MEETING_EXHIBITION_TARGET } from "@/api/meeting.server"

import { MEETING_EXHIBITION_TARGET_LIST_RESPONSE ,MEETING_EXHIBITION_TARGET_RESPONSE } from "@/types/meeting"

const MeetingTargetListServer = async ({params} : {
    params : {
        seq : string
    }
}) => {

    const queryServer = new QueryClient();

    const { seq } = params;

    // queryServer.prefetchQuery({
    //     queryKey : 
    // })


    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], `target-${seq}`],
        queryFn : async () => {
            const result = await API_SERVER_MEETING_EXHIBITION_TARGET(seq) as MEETING_EXHIBITION_TARGET_RESPONSE;

            if(result["resultCode"] !== 200) return null

            return result["data"]
        }
    })
    
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
            <MeetingTargetListView/>
        </HydrationBoundary>
    )
}

export default MeetingTargetListServer