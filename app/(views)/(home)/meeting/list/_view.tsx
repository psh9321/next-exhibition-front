"use client"

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead";
import MeetingExhibitionData from "@/component/(Home)/data/MeetingExhibitionData";

const MeetingPageView = () => {

    return (
        <>
            <HeadTitle title="모임이 있는 전시" isSearchBtn={true} />
            <MeetingExhibitionData/>
        </>
    )
}

export default MeetingPageView