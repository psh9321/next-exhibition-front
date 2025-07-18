"use client"

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { MoveUp, User2Icon } from 'lucide-react';

import TextareaAutosize from "react-textarea-autosize";
import MessageData from "@/component/(Home)/data/MessageData"

import useSocket from '@/hook/useSocket';
import { useUserInfoStore } from '@/store/useQueryStore';
import { useThemeStore } from '@/store/useThemeStore';

import { API_MESSAGE_READ } from '@/api/message.client';

import { fileUrl } from "@/util/opts";

import messageStyles from "@/styles/(home)/message/message.module.css"

import { USER_RECIVER, MESSAGE_FORM_VALUE, MESSAGE_READ_RESPONSE } from "@/types/message"


interface MESSAGE_ROOM {
    anotherIdKey : string,
    anotherData : USER_RECIVER
}

const MessageRoomView = ({ anotherIdKey, anotherData } : MESSAGE_ROOM) => {
    
    const { _id, _anotherId } = useParams();
        
    const { userInfoQuery, SetMessageQuery } = useUserInfoStore();

    const { theme } = useThemeStore();

    const { register, handleSubmit, watch, setValue } = useForm<MESSAGE_FORM_VALUE>({
        defaultValues : {
            reciverId : anotherIdKey,
            senderId : userInfoQuery?.["key"],
            message : ""
        }
    });
    
    const { Connect, SendMessage } = useSocket();

    function OnSubmit(messageItem : MESSAGE_FORM_VALUE){
        if(!messageItem["message"]) return
        
        SendMessage(messageItem);

        setValue("message", "")
        
    }
    
    useEffect(() => {
        Connect(anotherIdKey);
        
        API_MESSAGE_READ(_id as string, _anotherId as string)
        .then((rs : MESSAGE_READ_RESPONSE) => {

            const { resultCode, data } = rs;
            
            if(resultCode === 200 && data) SetMessageQuery(data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <>
            <div className={`${messageStyles.messageRoom} ${messageStyles[theme]}`}>
                <div className={messageStyles.opponentBox}>
                    <div className={messageStyles.imgBox} style={{backgroundImage : `url(${anotherData?.["profileImg"] && `${fileUrl}/${anotherData?.["id"]}/profile/${anotherData?.["profileImg"]}`})`}}>
                        {!anotherData?.["profileImg"] && <User2Icon/>}
                    </div>
                    <dl>
                        <dt>{anotherData?.["nickName"]}</dt>
                        <dd>{anotherData?.["area"]}</dd>
                    </dl>
                </div>
                <MessageData />
                <form onSubmit={handleSubmit(OnSubmit)} className={messageStyles.areaBox}>
                    <TextareaAutosize
                        defaultValue={watch("message")} 
                        {...register("message")} 
                        className={messageStyles.textarea}
                    />
                    
                    <button className={messageStyles.btnSend}>
                        <MoveUp/>
                    </button>
                </form>
            </div>
        </>
    )
}

export default MessageRoomView