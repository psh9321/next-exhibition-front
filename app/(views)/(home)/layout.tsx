import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"

import SocketProvider from "@/component/(Home)/provider/SocketProvider";
import ClientWrapper from "@/component/(Home)/shared/ClientWrapper";

import { getToken } from "@/util/token"

import { API_SERVER_USER_GET } from "@/api/user.server"
import { API_SERVER_FAVORITE_LIST } from "@/api/favorite.server";
import { API_SERVER_MEETING_PROMISE } from "@/api/meeting.server";
import { API_SERVER_MESSAGE_GET } from "@/api/message.server";

import { FAVORITE_RESPONSE } from "@/types/favorite"
import { GET_USER_RESPONSE } from "@/types/user"
import { MEETING_PROMISE_RESPONSE } from "@/types/meeting"
import { LAYOUT_CHILD } from "@/types/component"


const HomePageRoot = async ({children} : LAYOUT_CHILD) => {

  const queryServer = new QueryClient();
  
  const token = await getToken();

  if(token) {
    
    await queryServer.prefetchQuery({
      queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_USER_INFO"] as string],
      queryFn : async () => {
        
        const result = await API_SERVER_USER_GET(token) as GET_USER_RESPONSE;
        return result["data"]
      },
    });

    await queryServer.prefetchQuery({
      queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"],"promise"],
      queryFn : async () => {
        
        const result = await API_SERVER_MEETING_PROMISE(token) as MEETING_PROMISE_RESPONSE;

        return result["data"];
      },
    })

    await queryServer.prefetchQuery({
      queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"]],
      queryFn : async () => {
        
        const result = await API_SERVER_FAVORITE_LIST(token) as FAVORITE_RESPONSE;
        
        return result["data"]
      },
    });

    await queryServer.prefetchQuery({
      queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"],"rooms"],
      queryFn : async () => {        
        const result = await API_SERVER_MESSAGE_GET(token);
        
        return result["data"]
      },
    })
  }
  
  const dehydratedState = dehydrate(queryServer);

    return (
      <HydrationBoundary state={dehydratedState}>
        <SocketProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </SocketProvider>
      </HydrationBoundary>
    )
}

export default HomePageRoot