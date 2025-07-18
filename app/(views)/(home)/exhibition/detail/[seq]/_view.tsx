"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useKakaoLoader, Map, MapMarker } from "react-kakao-maps-sdk";

import { MapPinned } from 'lucide-react';

import { HeadLink } from "@/component/(Home)/shared/ClientWrapperHead";
import BtnFavorite from "@/component/(Home)/shared/BtnFavorite";
import EmptyDataPage from "@/component/(Home)/shared/EmptyPage";

import { useToastHook } from "@/hook/useToast";
import { useThemeStore } from '@/store/useThemeStore';

import { ExhibitionDateFormat } from "@/util/dateFormat";
import { areaColor, typesColor } from "@/util/opts";

import detailBoxStyle from "@/styles/(home)/exhibition/detail/seq/detailBox.module.css"

import { EXHIBITION_DETAIL_ITEM } from "@/types/exhibition"
import { AREA_COLOR_VALUE ,TYPES_COLOR_VALUE } from "@/types/opts"
import { MEETING_EXHIBITION_TARGET_DATA } from "@/types/meeting"

interface PARAMS {
    params : {
        seq : string
    }
}

const ExhibitionDetailPageView = ({ params } : PARAMS) => {

    const {seq} = params;

    const router = useRouter();

    const queryClient = useQueryClient();

    const queryData = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], seq]) as EXHIBITION_DETAIL_ITEM;

    const targetMeetingQueryData = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"], `target-list-${seq}`]) as InfiniteData<MEETING_EXHIBITION_TARGET_DATA>;
    
    const targetMeetingData = targetMeetingQueryData["pages"][0] as MEETING_EXHIBITION_TARGET_DATA;
    
    const userInfoQuery = queryClient.getQueryData(["userInfo-query"]);
    
    const { BeforeLoginToast, setToastState } = useToastHook();

    const { theme } = useThemeStore();

    const [loading, error] = useKakaoLoader({
        appkey : "231b71ed8f3ba4b8fa4971b49a8da106",
        // libraries : ["services"]
    });

    function LinkLoginBefore(e : React.MouseEvent<HTMLAnchorElement>) {
        
        if(userInfoQuery) return

        e.preventDefault();
        setToastState("로그인 후 이용 가능");
    }

    function NaviToLoginCallback() { router.replace("/account/login") };

    if(!queryData) return <EmptyDataPage/>

    const { title, price, phone, area, startDate, endDate, place, placeUrl, placeAddr, realmName, imgUrl, gpsX, gpsY, url } = queryData;

    return (
        <>
            <BeforeLoginToast naviToLoginCallback={NaviToLoginCallback}/>

            <HeadLink isSearchBtn={true} linkName="목록으로"/>

            <div className={`${detailBoxStyle.detailBox} ${detailBoxStyle[theme]}`}>
                <div className={detailBoxStyle.infoBox}>
                    <div style={{backgroundImage:`url(${imgUrl})`}}className={detailBoxStyle.imgBox}></div>
                    <dl>
                        <dt><BtnFavorite item={queryData} /> <span>{title}</span></dt>
                        <dd>{ExhibitionDateFormat(String(startDate))} ~ {ExhibitionDateFormat(String(endDate))}</dd>
                        <dd>{place} <Link target={"_blank"} href={placeUrl}>({placeUrl})</Link></dd>
                        <dd>{placeAddr}</dd>
                        <dd><Link href={`tel:${phone}`}>{phone}</Link></dd>
                        <dd> {price !== "무료" && price}</dd> 
                        
                        <dd className={detailBoxStyle.btnList}>
                            <Link onClick={LinkLoginBefore} href={`/meeting/add/${seq}`} className={`${detailBoxStyle.btnAdd} ${detailBoxStyle.btnJoinAdd}`}>모임 만들기</Link>
                            {url && <Link target={"_blank"} href={url} >예매하기</Link>}
                        </dd>
                        <dd>
                            <ul className={detailBoxStyle.typeList}>
                                {(price === "무료" || !price) && <li className={detailBoxStyle.freePrice}>무료</li>}
                                <li className={detailBoxStyle[typesColor[realmName] as TYPES_COLOR_VALUE]}>{realmName}</li>
                                <li className={detailBoxStyle[areaColor[area] as AREA_COLOR_VALUE]}>{area}</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div className={detailBoxStyle.meetingBox}>
                    <h3>
                        해당 전시 모임 
                        {targetMeetingData["total"] > 5 && <Link href={`/meeting/list/${seq}`}>모임 더보기</Link>}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th className={detailBoxStyle.title}>모임</th>
                                <th className={detailBoxStyle.member}>정원/총원</th>
                                <th className={detailBoxStyle.date}>모임 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                targetMeetingData["total"] > 0 ?
                                targetMeetingData["meetingTargetList"].map((el, i) => {
                                    if(i >= 5) return
                                    const { title, members, membersTotal, date, _id } = el
                                    return (
                                        <tr key={`${title}-${i}`}>
                                            <td className={detailBoxStyle.title}><Link href={`/meeting/detail/${_id}`}>{title}</Link></td>
                                            <td className={detailBoxStyle.member}>현재 : {members.length} 정원 : {membersTotal}</td>
                                            <td className={detailBoxStyle.date}>{date.replaceAll("-",".")}</td>
                                        </tr>
                                    )
                                })
                                : <tr className={detailBoxStyle.empty}>
                                      <td colSpan={3}>해당 전시에 대한 모임이 없습니다.</td>
                                </tr>
                            }                            
                        </tbody>
                    </table>
                </div>
                <div className={detailBoxStyle.mapBox}>
                    
                    <h3><MapPinned/>{placeAddr}</h3>
                    {loading && "로딩중"}
                    {error && "지도 불러오기 실패"}
                    <Map 
                        className={detailBoxStyle.map} 

                        center={{
                            lat : Number(gpsY),
                            lng : Number(gpsX)
                        }}

                    >
                        <MapMarker position={{lat : Number(gpsY),lng : Number(gpsX)}} />
                    </Map>
                </div>
            </div>
        </>
    )
}

export default ExhibitionDetailPageView