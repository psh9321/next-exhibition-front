"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { API_GET_EXHIBITION } from "@/api/openApi.client";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query"

import { useLoadingView } from "@/hook/useLoadingView";
import { useListModeStore } from "@/store/useListModeStore";
import { useThemeStore } from "@/store/useThemeStore";

import exhibitionListStyles from "@/styles/(home)/shared/exhibitionList.module.css"

import { ExhibitionDateFormat } from "@/util/dateFormat";

import { OPEN_API_CLIENT_RESPONSE_DATA, EXHIBITION_ITEM, CLIENT_EXHIBITION_API_PARAMS, EXHIBITION_API_RESPONSE } from "@/types/exhibition"



const SearchResultData = () => {

    const searchParams = useSearchParams();

    const { theme } = useThemeStore();

    const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
        queryKey: [process["env"]["NEXT_PUBLIC_QUERY_KEY_SEARCH_EXHIBITION"] as string],
        queryFn : Setup,
        initialPageParam: 0,
        getNextPageParam : (lastPage) => {
            const { page, total, limit } = lastPage as OPEN_API_CLIENT_RESPONSE_DATA ;
            
            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        },
        enabled : true,
    });

    const { listMode } = useListModeStore();

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();

    function MoreCallback(){ fetchNextPage() }

    async function Setup({pageParam} : QueryFunctionContext){
        
        ShowLoadingView();

        const resultParams = {
            offset : Number(pageParam??1),
            searchKeyword : searchParams.get("searchKeyword")
        } as CLIENT_EXHIBITION_API_PARAMS


        if(searchParams.get("searchArea")) {
            resultParams["searchArea"] = searchParams.get("searchArea")  as keyof CLIENT_EXHIBITION_API_PARAMS
        }

        if(searchParams.get("searchStartDate") && searchParams.get("searchEndDate")) {
            resultParams["searchStartDate"] = searchParams.get("searchStartDate") as keyof CLIENT_EXHIBITION_API_PARAMS

            resultParams["searchEndDate"] = searchParams.get("searchEndDate") as keyof CLIENT_EXHIBITION_API_PARAMS
        }

        return API_GET_EXHIBITION(resultParams)
        .then(rs => {
            HideLoadingView();
            const { data } = rs as EXHIBITION_API_RESPONSE;
            return data
        })
        .catch(err => {
            HideLoadingView();
            console.log("setup err", err)

            return null
        })
    }

    if(isLoading) return <></>
    
    return (
        <>
            <LoadingElement/>
            <ul className={`${exhibitionListStyles[`exhibitionList${listMode}`]} ${exhibitionListStyles["searchResult"]}`}>
            {    
                (data && data.pages.length > 0 && data.pages[0] !== null && data.pages[0].total > 0) ?
                <>
                    {
                        data.pages.map(page => {

                            if(!page) return
                            
                            const item = page["data"] as EXHIBITION_ITEM[];
                            
                            return item.map(el => {
                                const { thumbnail, title, place, area, startDate, endDate,seq } = el as EXHIBITION_ITEM; 
        
                                return (
                                    <li key={title} style={{backgroundImage : `url(${thumbnail})`}}>
                                        <Link href={`/exhibition/detail/${seq}`}>
                                            <div className={exhibitionListStyles.infoBox}>
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
                    {
                        hasNextPage && (
                            <li className={exhibitionListStyles.moreBox}> 
                                <button onClick={MoreCallback} className={exhibitionListStyles.btnMore}>더보기</button> 
                            </li>
                        )
                    }
                </>
                : 
                <li className={`${exhibitionListStyles.searchEmpty} ${exhibitionListStyles[theme]}`}>
                    <dl>
                        <dt>“{searchParams.get("searchKeyword")}”</dt>
                        <dd>검색 결과가 없습니다.</dd>
                    </dl>
                </li>
            }
            </ul>
        </>
    )
}

export default SearchResultData