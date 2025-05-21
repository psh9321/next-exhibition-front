"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { HeadSearchResult } from "@/component/(Home)/shared/ClientWrapperHead";
import SearchResultData from "@/component/(Home)/data/SearchResultData";

import { useToastHook } from "@/hook/useToast";

import { ExhibitionDateFormat } from "@/util/dateFormat";

const SearchResultPageView = () => {

    const queryClient = useQueryClient();

    const router = useRouter();

    const searchParams = useSearchParams();

    const { setToastState, SearchResultToast } = useToastHook();

    function ResetSearchResult(){ 
        setToastState("검색 초기화") 
    };
    
    async function ResetCallback(){
        await queryClient.cancelQueries({queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_SEARCH_EXHIBITION"] as string], exact : true});
        queryClient.removeQueries({queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_SEARCH_EXHIBITION"] as string], exact : true});

        router.push("/");
    }

    // console.log(queryClient.getQueryData(["search-exhibition"]))

    return (
        <>
            <SearchResultToast resetCallback={ResetCallback}/>

            <HeadSearchResult  
                startDate={ExhibitionDateFormat(searchParams.get("searchStartDate") as string)} 
                endDate={ExhibitionDateFormat(searchParams.get("searchEndDate") as string)}
                title={searchParams.get("searchKeyword")??""}
                area={searchParams.get("searchArea")??""}
            >
                <button onClick={ResetSearchResult} >검색 초기화</button>
            </HeadSearchResult>
            <SearchResultData/>

            </>
    
    )
}

export default SearchResultPageView