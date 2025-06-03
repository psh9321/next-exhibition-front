"use client"

import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

import { apiUrl } from "@/util/opts";

import { SEND_MESSAGE } from "@/types/message"

let socket : Socket | null = null;

const useSocket = () => {

    const disconnect = useCallback(() => {
        socket?.disconnect();
        socket = null;
    }, []);
    

    function SendMessage(item : SEND_MESSAGE){
        socket?.emit("sendMessage",item)
    }

    function Connect(userId : string){
        socket?.emit("key of connect",userId)
    }

    function LogoutDisconnect(userId : string) {
        socket?.emit("key of disconnect",userId)
    }

    useEffect(() => {

        if(socket) return

        socket = io(apiUrl, {
            transports : ["websocket"]
        });

        socket?.on("connect",() => {
        
            socket?.on("connect_error", (err) => {
                console.log("connect_error due to", err);
            });
        });

    },[]);

    return { socket, SendMessage, Connect, LogoutDisconnect, disconnect }
}

export default useSocket