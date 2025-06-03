"use client"

import { create } from "zustand"

import { MESSAGE_ITEMS_RESPONSE_DATA, MESSAGE_ROOM_ITEM } from "@/types/message"
import { DateFormat, DateTimeFormat } from "@/util/dateFormat";

type MAP_KEY = string;
type MAP_VALUE = {
    message : string,
    sendDate : string,
    sender : string
};

export type MESSAGE_MAP_DATA = [string, MAP_VALUE[]];
export type MESSAGE_MAP_DATA_LIST = MESSAGE_MAP_DATA[]; 

interface CHATTING_ROOM_STORE {
    messageData : {
        [key : string] : Map<MAP_KEY, MAP_VALUE[]>
    },
    CahttingScrollElements : HTMLUListElement | null,
    SetMessageStore : (queryKey : string, data : MESSAGE_ITEMS_RESPONSE_DATA) => void,
    SetTargetMessageStore : (queryKey : string, date : Date,data : MESSAGE_ROOM_ITEM) => void,
    GetMessageStore : (queryKey : string) => MESSAGE_MAP_DATA[],
    SetChattingScrollElements : (html : HTMLUListElement) => void
}

export const useChattingRoomStore = create<CHATTING_ROOM_STORE>((set, get) => ({
    messageData : {},

    CahttingScrollElements : null,

    SetMessageStore(queryKey, data){
        const { messageData } = get();

        const newData = {...messageData}

        const { message } = data;

        if(!newData.hasOwnProperty(queryKey)) newData[queryKey] = new Map([]);

        for(let i = 0; i < message.length; i++) {
            const date = DateFormat(message[i]["sendDate"]);

            const newArr = [...newData[queryKey].get(date) ?? []]

            const values = {
                message : message[i]["message"],
                sendDate : DateTimeFormat(message[i]["sendDate"]),
                sender : message[i]["sender"]
            }

            newArr.push(values);
            
            newData[queryKey].set(date, newArr);
        }
        set({
            messageData : newData
        })
    },

    SetTargetMessageStore(queryKey, date, data){
        const { messageData } = get();
        
        const newData = {...messageData}

        if(!newData[queryKey]) {
            newData[queryKey] = new Map([]);
        }

        const mapData = newData[queryKey]; 

        const mapKey = DateFormat(date);

        const newArr = [...mapData.get(mapKey)??[]]

        const values = {
            message : data["lastMessage"]["message"],
            sendDate : DateTimeFormat(data["lastMessage"]["sendDate"]),
            sender : data["lastMessage"]["sender"]
        }

        newArr.push(values);

        newData[queryKey].set(mapKey, newArr);

        
        set({
            messageData : newData
        })

    },

    GetMessageStore(queryKey){
        
        const { messageData } = get();

        const mapData = messageData[queryKey];
        if(!(mapData instanceof Map)) messageData[queryKey] = new Map([])

        const result = [...messageData[queryKey]];
        
        return result??[];
    },

    SetChattingScrollElements(html) { set({ CahttingScrollElements : html }) },
}))