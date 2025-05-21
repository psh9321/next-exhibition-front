import { redirect } from "next/navigation"

import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import MyMeetingPageView from "./_view"

import { API_SERVER_MEETING_PROMISE } from "@/api/meeting.server"

import { getToken } from "@/util/token"

import { MEETING_PROMISE_RESPONSE } from "@/types/meeting"

const MyMeetingPageServer = async () => {
    const token = await getToken();

    if(!token) return redirect("/"); 

    const queryServer = new QueryClient();    
    
    await queryServer.prefetchQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"], "promise"],
        queryFn : async () => {
            const result = await API_SERVER_MEETING_PROMISE(token) as MEETING_PROMISE_RESPONSE;

            return result["data"]
        },
    });

    const dehydratedState = dehydrate(queryServer);
    
    return (
        <HydrationBoundary state={dehydratedState}>
            <MyMeetingPageView/>
        </HydrationBoundary>
    )
}

export default MyMeetingPageServer