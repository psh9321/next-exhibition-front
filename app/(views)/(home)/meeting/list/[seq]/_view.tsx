"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import MeetingListTargetData from "@/component/(Home)/data/MeetingListTargetData"
import EmptyDataPage from "@/component/(Home)/shared/EmptyPage"

import { areaColor, typesColor } from "@/util/opts";
import { ExhibitionDateFormat } from "@/util/dateFormat"

import meetingListTargetStyles from "@/styles/(home)/meeting/meetingListTarget.module.css"

import { MEETING_EXHIBITION_ITEM } from "@/types/meeting"
import { AREA_COLOR_VALUE ,TYPES_COLOR_VALUE } from "@/types/opts"

const MeetingTargetListView = () => {

    const params = useParams()

    const queryClient = useQueryClient();

    const queryData = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], `target-${params.seq}`]) as MEETING_EXHIBITION_ITEM;

    if(!queryData) return <EmptyDataPage/>

    const { 
        exhibitionTitle,
        exhibitionStartDate,
        exhibitionEndDate,
        exhibitionImg,
        exhibitionArea,
        exhibitionType,
        exhibitionPrice,
        exhibitionPlace,
        seq 
    } = queryData;

    return (
        <>
            <div className={meetingListTargetStyles.exhibitionInfo}>
                <div style={{backgroundImage: `url(${exhibitionImg})`}} className={meetingListTargetStyles.thumbnailBox}>
                    
                </div>
                <dl>
                    <dt><Link href={`/exhibition/detail/${seq}`}>{exhibitionTitle}</Link></dt>
                    <dd>{ExhibitionDateFormat(exhibitionStartDate)} ~ {ExhibitionDateFormat(exhibitionEndDate)}</dd>
                    <dd>
                        {
                            (exhibitionPrice === "무료" || !exhibitionPrice) &&
                            <span className={meetingListTargetStyles.freePrice}>무료</span>
                        }
                        <span className={meetingListTargetStyles[typesColor[exhibitionType] as TYPES_COLOR_VALUE]}>전시</span>
                        <span  className={meetingListTargetStyles[areaColor[exhibitionArea] as AREA_COLOR_VALUE]}>서울</span>
                    </dd>
                    {
                        exhibitionPrice === "무료" && <dd>{exhibitionPrice}</dd>
                    }
                    <dd>{exhibitionPlace}</dd>
                </dl>
            </div>
            <div className={meetingListTargetStyles.inner}>
                <MeetingListTargetData/>
            </div>
        </>
    )
}

export default MeetingTargetListView