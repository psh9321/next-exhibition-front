
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { API_EXHIBITION_LIST } from "@/api/openApi.server"

import { OPEN_API_CLIENT_RESPONSE_DATA, EXHIBITION_API_RESPONSE } from "@/types/exhibition"

import IndexPageView from "./_view";

const IndexPageServer = async () => {

    const queryServer = new QueryClient();

    await queryServer.prefetchInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"],"list"],
        queryFn : async ({pageParam}) => {
            const result = await API_EXHIBITION_LIST({
                PageNo : String(pageParam),
                numOfrows : "20",
                serviceTp : "A",
                sortStdr : "1"
            }) as EXHIBITION_API_RESPONSE;

            return result["data"]
        },
        initialPageParam: 1,
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
            <IndexPageView/>
        </HydrationBoundary>
    )
}

export default IndexPageServer