import { API_SERVER_MEETING_DETAIL } from "@/api/meeting.server"

import DetailMeetingPageView from "./_view";
import EmptyDataPage from "@/component/(Home)/shared/EmptyPage"

import { MEETING_DETAIL_RESPONSE, MEETING_DETAIL_RESPONSE_DATA } from "@/types/meeting"

interface DETAIL_QUERY_PARAMS {
    params : {
        _id : string
    }
}

const DetailMeetingPageServer = async ({params} : DETAIL_QUERY_PARAMS) => {
    const { _id } = params;

    const { resultCode, data } = await API_SERVER_MEETING_DETAIL(_id) as MEETING_DETAIL_RESPONSE; 

    if(!resultCode || !data || resultCode !== 200 || !data) return <EmptyDataPage/>

    return <DetailMeetingPageView data={data as MEETING_DETAIL_RESPONSE_DATA}/>
}

export default DetailMeetingPageServer