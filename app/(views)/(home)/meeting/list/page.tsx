import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import MeetingPageView from "./_view";

import { API_SERVER_MEETING_EXHIBITION } from "@/api/meeting.server";


const MeetingPageServer = async () => {

    const queryServer = new QueryClient();

    await queryServer.prefetchInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"],"exhibition"],
        queryFn : async () => {
            const result = await API_SERVER_MEETING_EXHIBITION(0, 20);

            return result["data"]
        },
        initialPageParam: 0,
    })
    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <MeetingPageView/>
        </HydrationBoundary>
    )
}

export default MeetingPageServer