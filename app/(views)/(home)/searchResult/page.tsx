
import { API_EXHIBITION_LIST } from "@/api/openApi.server"
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { OPEN_API_QUERY_DATA, OPEN_API_CLIENT_RESPONSE_DATA, EXHIBITION_API_RESPONSE } from "@/types/exhibition"

import SearchResultView from "./_view"

interface SEARCH_BOX_FORM_VALUE {
    searchKeyword? : string,
    searchStartDate? : string,
    searchEndDate? : string,
    searchArea? : string
}

interface SEARCH_RESULT_INTERFACE {
    searchParams: SEARCH_BOX_FORM_VALUE
}

const SearchResultPageServer = async ({searchParams} : SEARCH_RESULT_INTERFACE) => {

    const queryServer = new QueryClient();
    
    const obj = {
        keyword : searchParams.searchKeyword,
        from : searchParams.searchStartDate,
        to : searchParams.searchEndDate,
        sido : searchParams.searchArea,
        PageNo : "1",
        numOfrows : "20",
        serviceTp : "A",
        sortStdr : "1"
    } as OPEN_API_QUERY_DATA

    await queryServer.prefetchInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_SEARCH_EXHIBITION"]],
        queryFn : async () => {
            const result = await API_EXHIBITION_LIST(obj) as EXHIBITION_API_RESPONSE;
            return result["data"]
        },
        initialPageParam : 1,
        getNextPageParam : (lastPage : OPEN_API_CLIENT_RESPONSE_DATA | null) => {
            if(!lastPage) return undefined

            const { page, total, limit } = lastPage as OPEN_API_CLIENT_RESPONSE_DATA;
            
            const totalPage = Math.ceil(total/limit);

            if(page < totalPage) return page+1;

            return undefined
        }
    })

    const dehydratedState = dehydrate(queryServer);

    return (
        
        <HydrationBoundary state={dehydratedState}>
            <SearchResultView />
        </HydrationBoundary>
    )
}

export default SearchResultPageServer