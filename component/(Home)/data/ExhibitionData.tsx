"use client"

import Link from "next/link";
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query"

import BtnFavorite from "../shared/BtnFavorite";

import { useLoadingView } from "@/hook/useLoadingView";
import { useListModeStore } from "@/store/useListModeStore";

import { ExhibitionDateFormat } from "@/util/dateFormat";

import { API_GET_EXHIBITION } from "@/api/openApi.client";

import { OPEN_API_CLIENT_RESPONSE_DATA, EXHIBITION_ITEM, EXHIBITION_API_RESPONSE  } from "@/types/exhibition"

import exhibitionListStyles from "@/styles/(home)/shared/exhibitionList.module.css"


const ExhibitionData = () => {
    
    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"] as string, "list"],
        queryFn : Setup,
        initialPageParam: 1,
        getNextPageParam : (lastPage) => {
            if(!lastPage) return undefined

            const { page, total, limit } = lastPage as OPEN_API_CLIENT_RESPONSE_DATA;

            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        }
    });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();

    const { listMode } = useListModeStore();

    async function Setup({pageParam} : QueryFunctionContext){

        ShowLoadingView();

        return API_GET_EXHIBITION({offset : Number(pageParam??1)})
        .then(rs => {
            
            HideLoadingView();

            const result = rs as EXHIBITION_API_RESPONSE
            
            return result["data"]
        })
        .catch(err => {
            HideLoadingView();
            console.log("setup err", err)
        })
    }

    useEffect(() => {
        if(inView) fetchNextPage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView])

    if(isLoading || !data) return <></>

    return (
        <>
            <LoadingElement/>
            
            <ul className={exhibitionListStyles[`exhibitionList${listMode}`]}>
                {
                    data?.pages.map((page) => {

                        if(!page) return
                        
                        const item = page["data"];

                        return item.map(el => {
                            const { thumbnail, title, place, area, startDate, endDate,seq } = el as EXHIBITION_ITEM; 

                            return (
                                <li className={exhibitionListStyles.li} key={title} style={{backgroundImage : `url(${thumbnail})`}}>
                                    <Link href={`/exhibition/detail/${seq}`}>
                                        <div className={exhibitionListStyles.infoBox}>
                                            <BtnFavorite item={el} />
                                            
                                            <dl>
                                                <dt>{decodeURIComponent(title)}</dt>
                                                <dd className={exhibitionListStyles.date}>{ExhibitionDateFormat(String(startDate))} ~ {ExhibitionDateFormat(String(endDate))}</dd>
                                                <dd className={exhibitionListStyles.area}>{place} ({area})</dd>
                                            </dl>
                                        </div>
                                    </Link>
                                </li>      
                            )      
                        })
                    })
                }
                <li ref={ref} style={{ height: 1 }} /> 
            </ul>
        </>
    )
}

export default ExhibitionData