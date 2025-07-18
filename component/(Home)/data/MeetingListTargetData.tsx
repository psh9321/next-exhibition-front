"use client"

import Link from "next/link";

import { useParams } from "next/navigation";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"

import { useLoadingView } from "@/hook/useLoadingView";
import { useThemeStore } from "@/store/useThemeStore";

import { fileUrl } from "@/util/opts";

import { API_MEETING_EXHIBITION_TARGET_LIST } from "@/api/meeting.client";

import meetingListTargetStyles from "@/styles/(home)/meeting/meetingListTarget.module.css"

import { MEETING_EXHIBITION_TARGET_DATA, MEETING_EXHIBITION_TARGET_LIST_RESPONSE } from "@/types/meeting"


const MeetingListTargetData = () => {

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();

    const { theme } = useThemeStore();

    const params = useParams();

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"] as string,`target-list-${params.seq}`],
        queryFn : Setup,
        initialPageParam : 0,
        getNextPageParam : (lastPage, allParam) => {

            const page = allParam.length-1;

            const { total } = lastPage;

            const totalPage = Math.ceil(total/20);

            if(page < totalPage) return page+1;

            return undefined
        }
    });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });

    async function Setup({ pageParam } : QueryFunctionContext){

        ShowLoadingView();

        return API_MEETING_EXHIBITION_TARGET_LIST(params.seq as string, Number(pageParam), 10)
        .then((rs) => {

            HideLoadingView();

            const { data } = rs as MEETING_EXHIBITION_TARGET_LIST_RESPONSE

            return data
        })
        .catch(err => {
            HideLoadingView();
            console.log("setup err",err)
            return err
        })
    }

    useEffect(() => {
        if(inView) fetchNextPage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView])
    
    if(isLoading) return <></>

    return (
        <>
            <LoadingElement/>

            <ul className={`${meetingListTargetStyles.meetingTargetList} ${meetingListTargetStyles[theme]}`}>
                {
                    data && data.pages.length > 0 &&
                    data.pages.map(page => {
                        const { total, meetingTargetList } = page as MEETING_EXHIBITION_TARGET_DATA;

                        if(total <= 0) {
                            return
                        }
                        else {
                            return meetingTargetList.map((el, i) => {
                                const { title, createUserNickName, createUserImg , createUserId , membersTotal, members, date, _id } = el;

                                return (
                                    <li key={`${title}-${i}`}>
                                    <Link href={`/meeting/detail/${_id}`}>
                                        <dl>
                                            <dt>{title}</dt>
                                            <dd className={meetingListTargetStyles.creater}>
                                                <div className={meetingListTargetStyles.imgBox} style={{
                                                    backgroundImage : `url(${fileUrl}/${createUserId}/profile/${createUserImg})`
                                                }}></div>
                                                {createUserNickName}
                                            </dd>
                                            <dd>모임 날짜 : {date.replaceAll("-",".")}</dd>
                                            <dd>현재 정원 : {members.length} | 총 정원 : {membersTotal}</dd>
                                        </dl>
                                    </Link>
                                </li>
                                )
                            })
                        }
                    })
                }
                {hasNextPage && <li ref={ref} style={{ height: 1 }} /> }
            </ul>
        </>
    )
}

export default MeetingListTargetData