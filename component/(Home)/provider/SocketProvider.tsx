"use client"

import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

import useSocket from "@/hook/useSocket"

import { LAYOUT_CHILD } from "@/types/component"
import { useUserInfoStore } from "@/store/useQueryStore";
import { useChattingRoomStore } from "@/store/useChattingRoomStore";

import { API_MESSAGE_READ } from "@/api/message.client";

import { MESSAGE_ROOM_RESPONSE_DATA} from "@/types/message"




const SocketProvider = ({children} : LAYOUT_CHILD) => {

    const { socket, Connect } = useSocket();

    const pathname = usePathname();

    const { _id, _anotherId } = useParams();

    const { userInfoQuery, messageQuery, SetTargetMessageQuery } = useUserInfoStore();
    const { SetTargetMessageStore } = useChattingRoomStore();
    
    
    useEffect(() => {
        if(!userInfoQuery) return

        Connect(userInfoQuery["key"]);

        socket?.off("reciveMessage");

        const isConnectRoom = pathname === `/message/${_id}/${_anotherId}`;

        socket?.on("reciveMessage", (data : MESSAGE_ROOM_RESPONSE_DATA) => {
            SetTargetMessageQuery(data, isConnectRoom); 
            SetTargetMessageStore(`${_id}-${_anotherId}`, new Date(), data["roomInfo"]);

            if(isConnectRoom) API_MESSAGE_READ(_id as string, _anotherId as string);
        });


    },[userInfoQuery, pathname, messageQuery]);

    return (
        <>
            {children}
        </>
    )
}

export default SocketProvider