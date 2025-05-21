"use server"

import { ThrowModel } from "@/util/throwModel";
import { BACKEND_API } from "./_api.call.module";

import { RESPONSE_MODEL } from "@/types/response"
import { 
    MESSAGE_USER_RECIVER_RESPONSE, 
    MESSAGE_ROOM_RESPONSE, 
    MESSAGE_DATA_RESPONSE, 
    MESSAGE_READ_RESPONSE 
} from "@/types/message"



export async function API_SERVER_MESSAGE_GET_ANOTHER(tokenStr : string, anotherId : string){
    try {
        const result = await BACKEND_API(`message/anoter/${anotherId}`, {
            method: "get",
            headers : {
                auth : tokenStr
            },
        })
        .json<MESSAGE_USER_RECIVER_RESPONSE>()
        .catch<MESSAGE_USER_RECIVER_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MESSAGE_USER_RECIVER_RESPONSE
    }
}

export async function API_SERVER_MESSAGE_GET(tokenStr : string){

    
    try {
        
        const result = await BACKEND_API("message/room", {
            method : "get",
            headers : {
                auth : tokenStr
            },
            // next : {
            //     revalidate : catchTime,
            //     // tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"] as string]
            // },
            cache : "no-store"
        })
        .json<MESSAGE_ROOM_RESPONSE>()
        .catch<MESSAGE_ROOM_RESPONSE>();
        
        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MESSAGE_ROOM_RESPONSE
    }
}

export async function API_SERVER_MESSAGE_DATA(tokenStr : string, anotherId : string, offset : number, limit : number) {
    try {
 
        const result = await BACKEND_API(`message/data/${anotherId}`, {
            method : "get",
            headers : {
                auth : tokenStr
            },
            searchParams : {
                offset, 
                limit
            },
            // next : {
            //     tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"] as string]
            // }
            cache : 'no-store'
        })
        .json<MESSAGE_DATA_RESPONSE>()
        .catch<MESSAGE_DATA_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MESSAGE_DATA_RESPONSE
    }
}

export async function API_SERVER_MESSAGE_READ(tokenStr : string, reader_id : string, sender_id : string){
    try {
        const result = await BACKEND_API(`message/read/${reader_id}/${sender_id}`, {
            method : "get",
            headers : {
                auth : tokenStr
            },
            cache : 'no-store'
        })
        .json<MESSAGE_READ_RESPONSE>()
        .catch<MESSAGE_READ_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MESSAGE_READ_RESPONSE
    }
}