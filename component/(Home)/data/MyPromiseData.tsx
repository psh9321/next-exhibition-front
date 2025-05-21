"use client"

import Link from "next/link";
import { useEffect } from "react";
import { UserRound } from 'lucide-react';

import { useUserInfoStore } from "@/store/useQueryStore";

import { fileUrl } from "@/util/opts";

import { MEETING_ITEM } from "@/types/meeting"

import meetingListStyle from "@/styles/(home)/meeting/meetingList.module.css"

const MyPromiseData = ({ promise } : {promise : MEETING_ITEM[]}) => {

    const { promiseQuery, ResetPromiseQuery } = useUserInfoStore();

    useEffect(() => {
        if(promiseQuery?.total as number > 0 && promise?.length <= 0) {
            ResetPromiseQuery();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <ul className={meetingListStyle["meetingList"]}>
            {
                promise && promise.length > 0 ?
                promise.map((el, i) => {
                    const { title, date, exhibitionImg, exhibitionTitle, membersTotal, members, createUserImg, createUserId, _id } = el as MEETING_ITEM;

                    return (
                            <li  key={`${title}-${i}`}>
                                <Link href={`/meeting/detail/${_id}`}>
                                    <div className={meetingListStyle.createrBox} style={{backgroundImage : `url(${createUserImg && `${fileUrl}/${createUserId}/profile/${createUserImg}`})`}}>
                                        { !createUserImg && <UserRound/> }
                                    </div>
                                    <div className={meetingListStyle.imgBox} style={{backgroundImage:`url(${exhibitionImg})`}}></div>
                                    <dl>
                                        <dt>{title}</dt>
                                        <dd>{exhibitionTitle}</dd>
                                        <dd>현재 : {members.length}명 정원 : {membersTotal}명</dd>
                                        <dd className={meetingListStyle["data"]}>
                                            모임 날짜 : {date.replaceAll("-",".")}
                                        </dd>
                                    </dl>
                                </Link>                                
                            </li>
                    )
                }) :
                <li className={meetingListStyle.promiseEmpty}>
                    <dl>
                        <dt>약속된 모임이 없습니다.</dt>
                        <dd>모임 생성, 혹은 모임에 가입해보세요.</dd>
                    </dl>
                    <ul>
                        <li><Link href="/">전시 보기</Link></li>
                        <li><Link href="/meeting/list">모임 보기</Link></li>
                    </ul>
                </li>
            }
        </ul>
    )
}

export default MyPromiseData