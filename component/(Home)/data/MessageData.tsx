"use client"

import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer"

import { useLoadingView } from "@/hook/useLoadingView";
import { useChattingRoomStore } from "@/store/useChattingRoomStore";

import { API_MESSAGE_DATA } from "@/api/message.client";

import messageStyles from "@/styles/(home)/message/message.module.css"

import { MESSAGE_ITEMS_RESPONSE_DATA, MESSAGE_DATA_RESPONSE } from "@/types/message"

import { useParams } from "next/navigation";


const MessageData = () => {

    const scrollContainer = useRef<HTMLUListElement | null>(null)

    const { _id, _anotherId } = useParams();
    
    const { GetMessageStore ,SetMessageStore } = useChattingRoomStore();

    const { ref : inViewRef, inView } = useInView({
        threshold: 0,
        delay: 0,
    });

    const [init, setInit] = useState<boolean>(false);

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();
 
    const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"] as string,`${_id}-${_anotherId}`],
        queryFn : Setup,
        initialPageParam : 0,
        getNextPageParam : (lastPage) => {
            if(!lastPage) return undefined
            
            const { page, total, limit } = lastPage as MESSAGE_ITEMS_RESPONSE_DATA;

            const totalPage = Math.ceil(total/limit);

            if(page < totalPage-1) return page+1;

            return undefined
        },
    });

    async function Setup({pageParam} : QueryFunctionContext){
        
        ShowLoadingView();

        return API_MESSAGE_DATA(_anotherId as string, pageParam as number, 20)
        .then(rs => {
            HideLoadingView();

            const { resultCode, data } = rs as MESSAGE_DATA_RESPONSE;
            if(resultCode !== 200) return [];
            
            SetMessageStore(`${_id}-${_anotherId}`, data as MESSAGE_ITEMS_RESPONSE_DATA)

            return data
        })
        .catch(err => {
            HideLoadingView();
            console.log("setup error",err)
            return null
        })

    }
    
    useLayoutEffect(() => {

        if(!scrollContainer["current"]) return 

        const scrollList = scrollContainer["current"];
        
        scrollList.scrollTop = scrollList.scrollHeight;

        if(!init) setInit(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, GetMessageStore(`${_id}-${_anotherId}`)]);

    useEffect(() => {
        
        if(!init) return

        if(inView && hasNextPage) fetchNextPage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView]);
    
    
    if(isLoading) return <></>

    return (
        <>
            <LoadingElement/>

            <ul className={messageStyles.messageList} ref={scrollContainer}>
                {
                    hasNextPage && <li className="22" ref={inViewRef} style={{ height: 1 }} /> 
                }
                {
                    
                    GetMessageStore(`${_id}-${_anotherId}`).map((el) => {
                        
                        const [ dateKey, item ] = el;

                        return (
                            <li key={dateKey}>
                                <h3>{dateKey}</h3>
                                <ul className={messageStyles.messageContentsList}>
                                    {
                                        item.map((el, i) => {
                                            return (
                                                <li key={`${el["message"]}-${i}`} className={_id === el["sender"] ? messageStyles.my : messageStyles.opponent}>
                                                    <dl>
                                                        <dt>
                                                            {el["message"]}
                                                        </dt>
                                                        <dd>
                                                            {el["sendDate"]}
                                                        </dd>
                                                    </dl>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>

        </>
    )
}

export default MessageData