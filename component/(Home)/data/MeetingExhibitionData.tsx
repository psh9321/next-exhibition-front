"use client"

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react";

import { useLoadingView } from "@/hook/useLoadingView";

import { ExhibitionDateFormat } from "@/util/dateFormat";
import { areaColor, typesColor } from "@/util/opts";

import { API_MEETING_EXHIBITION_LIST } from "@/api/meeting.client"

import meetingListStyle from "@/styles/(home)/meeting/meetingList.module.css";

import { MEETINGEXHIBITION_RESPONSE_DATA } from "@/types/meeting";
import { AREA_COLOR_VALUE ,TYPES_COLOR_VALUE } from "@/types/opts"

const MeetingData = () => {

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();
    
    const { data, isStale, refetch } = useInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string,"list"],
        queryFn : ({pageParam = 0}) => Setup(pageParam),
        initialPageParam : 0,
        getNextPageParam : (lastpage) => {
            if(!lastpage) return undefined

            // const { meeting } = lastpage as MEETING_LIST_RESPONSE_DATA;

            // if(20 > meeting.length) return undefined

            // const currPage = allPages.length-1;

            return 0
            
        },
    });

    async function Setup(offset : number)  {
        ShowLoadingView();

        
        return API_MEETING_EXHIBITION_LIST(offset, 20)
        .then(rs => {
            HideLoadingView();

            if(rs["resultCode"] !== 200) {
                
                return null;
            }
    

            return rs["data"]
        })
        .catch(err => {
            HideLoadingView();
            console.log("API_MEETING_LIST err",err)
            return null;
    
        })
    }

    useEffect(() => {
        if(isStale) refetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (   
        <>
                <LoadingElement/>
                <ul className={meetingListStyle["meetingList"]}>
                    {
                        data && data.pages.length > 0 &&
                        data.pages.map(page => {

                            console.log(data,"pagepage",page)

                            if(!page) return "null"

                            const { total, meetingExhibition } = page as MEETINGEXHIBITION_RESPONSE_DATA
                            
                            if(total <= 0) {
                                return (
                                    <li key={"empty-meeting"} className={meetingListStyle.empty}>
                                        <dl>
                                            <dt>등록된 모임이 없습니다.</dt>
                                            <dd>첫 모임을 등록해보세요</dd>
                                            <dd>*모임은 로그인 후 전시 상세페이지 에서 만들수 있습니다.</dd>
                                            <dd>
                                                <Link href="/">전시 보러가기</Link>
                                            </dd>
                                        </dl>
                                    </li>
                                )
                            }

                            return meetingExhibition.map((el, i) => {
                                const { exhibitionTitle, seq, exhibitionStartDate, exhibitionEndDate, exhibitionImg, exhibitionArea, exhibitionType, exhibitionPrice, exhibitionPlace } = el;

                                return (
                                    <li  key={`${exhibitionTitle}-${i}`}>
                                        <Link href={`/meeting/list/${seq}`}>
                                            <div style={{backgroundImage : `url(${exhibitionImg})`}} className={meetingListStyle.imgBox}>

                                            </div>
                                            <dl>
                                                <dt>{exhibitionTitle}</dt>
                                                <dd>{ExhibitionDateFormat(exhibitionStartDate)} ~ {ExhibitionDateFormat(exhibitionEndDate)}</dd>
                                                <dd>{exhibitionPlace}</dd>
                                                <dd>
                                                
                                                    {
                                                        (exhibitionPrice === "무료" || !exhibitionPrice) &&
                                                        <span className={meetingListStyle.freePrice}>{exhibitionPrice}</span>
                                                    }
                                                    <span className={meetingListStyle[areaColor[exhibitionArea] as AREA_COLOR_VALUE]}>{exhibitionArea}</span>
                                                    <span className={meetingListStyle[typesColor[exhibitionType] as TYPES_COLOR_VALUE]}>{exhibitionType}</span>
                                                </dd>
                                            </dl>
                                        </Link>                                
                                    </li>
                                )
                            })
                        })
                    }
                </ul>
        </>
    )
}

export default MeetingData