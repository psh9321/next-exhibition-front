"use client"

import { create } from "zustand"

import { USER_INFO } from "@/types/user"
import { MEETING_PROMISE_RESPONSE_DATA } from "@/types/meeting"
import { FAVORITE_RESPONSE_DATA } from "@/types/favorite"
import { MESSAGE_ROOM_RESPONSE_DATA } from "@/types/message"

interface USER_INFO_STORE {
    userInfoQuery : USER_INFO | null, /** 좋아요 한 전시 수 */
    favoriteQuery : FAVORITE_RESPONSE_DATA | null, /** 좋아요 한 전시 쿼리 */
    promiseQuery : MEETING_PROMISE_RESPONSE_DATA | null, /** 약속된 모임 쿼리 */
    messageQuery : MESSAGE_ROOM_RESPONSE_DATA[] | null, /** 1:1 메세지 쿼리 */
    unReadMessageTotal : number, /** 읽지않은 메세지 */

    SetUserInfoQuery : (newUserInfoData : USER_INFO) => void;
    SetFavoriteQuery : (newFavoriteData : FAVORITE_RESPONSE_DATA) => void;
    SetPromiseQuery : (newPromiseData : MEETING_PROMISE_RESPONSE_DATA) => void;
    SetMessageQuery : (newMessageDatas : MESSAGE_ROOM_RESPONSE_DATA[]) => void;
    CreateMessageQuery : (newMessageData : MESSAGE_ROOM_RESPONSE_DATA) => void;
    ResetPromiseQuery : () => void;
    SetTargetMessageQuery : (data : MESSAGE_ROOM_RESPONSE_DATA, isConnectRoom : boolean) => void;
    UnSetQuery : () => void;
}

export const useUserInfoStore = create<USER_INFO_STORE>((set, get) => ({    
    userInfoQuery : null,
    favoriteQuery : null,
    promiseQuery : null,
    messageQuery : null,
    unReadMessageTotal : 0,

    SetUserInfoQuery(newUserInfoData) { 
        
        set({ userInfoQuery : newUserInfoData }) },

    SetFavoriteQuery(newFavoriteData) { set({ favoriteQuery : newFavoriteData }) },

    SetPromiseQuery(newPromiseData) { set({ promiseQuery : newPromiseData }) },

    CreateMessageQuery(newMessageData){
        const { messageQuery } = get();

        if(!messageQuery) return

        const newData = [ ...messageQuery ];

        newData.push(newMessageData);

        set({ messageQuery : newData });
    },

    SetMessageQuery(newMessageDatas) {      
        if(newMessageDatas.length <= 0) return set({messageQuery : newMessageDatas}); /** 빈배열 */
        
        const unReadMessage = newMessageDatas.reduce((acc, curr) => {
            return acc + (curr.unReadMessage || 0);
        }, 0);
        
        set({
            messageQuery : newMessageDatas,
            unReadMessageTotal : unReadMessage
        })
    },

    SetTargetMessageQuery(data, isConnectRoom) {
        
        const { messageQuery } = get();

        if(!messageQuery) return
        
        const newData = [...messageQuery];

        const targetIdx = newData.findIndex(el => {
            return el["roomInfo"]["ids"].every(key => data["roomInfo"]["ids"].includes(key))
        });
        
        if(targetIdx < 0) newData.push(data);
        
        if(isConnectRoom) {
            newData[targetIdx > 0 ? targetIdx : newData.length-1]["unReadMessage"] = 0            
        }
        else {
            newData[targetIdx > 0 ? targetIdx : newData.length-1]["unReadMessage"]+=1;
        }

        newData[targetIdx > 0 ? targetIdx : newData.length-1]["roomInfo"]["lastMessage"] = data["roomInfo"]["lastMessage"];
        
        set({
            messageQuery : newData,
            unReadMessageTotal : newData.reduce((acc ,curr) => acc + curr["unReadMessage"], 0)
        })
    },



    ResetPromiseQuery(){
        set({
            promiseQuery : {
                total : 0,
                promise : []
            }
        })
    },

    UnSetQuery(){
        set({
            userInfoQuery : null,
            favoriteQuery : null,
            promiseQuery : null,
            messageQuery : null,
            unReadMessageTotal : 0,
        })
    }
}))
