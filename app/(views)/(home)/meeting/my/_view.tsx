"use client"

import { useQuery } from "@tanstack/react-query"

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead"
import MyPromiseData from "@/component/(Home)/data/MyPromiseData"

import { MEETING_PROMISE_RESPONSE_DATA } from "@/types/meeting"
import { API_MEETING_PROMISE } from "@/api/meeting.client"

const MyMeetingPageView = () => {

    
    const { data } = useQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string, "promise"],
        queryFn : async () => {
            const result = await API_MEETING_PROMISE();

            return result["data"];
        }
    })

    const { promise, total } = data as MEETING_PROMISE_RESPONSE_DATA;

    return (
        <>
            <HeadTitle isSearchBtn={true} title={`약속 된 모임 : ${total??0}`} />
            <MyPromiseData promise={promise}/>
        </>
    )
}

export default MyMeetingPageView