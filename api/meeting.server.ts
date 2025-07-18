"use server"

import { catchTime } from "@/util/catchTime";
import { ThrowModel } from "@/util/throwModel";

import { BACKEND_API } from "./_api.call.module";

import { RESPONSE_MODEL } from "@/types/response"
import { 
    MEETING_ADD_SERVER_VALUE,
    MEETING_POST_RESPONSE, 
    MEETING_PROMISE_RESPONSE, 
    MEETING_LIST_RESPONSE, 
    MEETING_SEARCH_PARAMS, 
    MEETING_DETAIL_RESPONSE, 
    MEETING_UPDATE_SERVER_VALUE, 
    MEETING_EXHIBITION_RESPONSE, 
    MEETING_EXHIBITION_TARGET_LIST_RESPONSE, 
    MEETING_EXHIBITION_TARGET_RESPONSE 
} from "@/types/meeting"

export async function API_SERVER_MEETING_LIST({
    offset = "0",
    limit = "20",
    ...rest
} : MEETING_SEARCH_PARAMS) {
    try {
                
        const result = await BACKEND_API("meeting", {
            method: "get",
            searchParams : {
                offset,
                limit,
                ...rest
            },
            next : {
                revalidate : catchTime,
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            },
        })
        .json<MEETING_LIST_RESPONSE>()
        .catch<MEETING_LIST_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_LIST_RESPONSE
    }
}

export async function API_SERVER_MEETING_PROMISE(tokenStr : string) {
    try {

        if(!tokenStr) return
        
        const result = await BACKEND_API("meeting/promise", {
            method: "get",
            headers : {
                auth : tokenStr
            },
            next : {
                revalidate : catchTime,
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            },
            // cache : "no-store"
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_PROMISE_RESPONSE
    }
}

export async function API_SERVER_MEETING_ADD(tokenStr : string, item : MEETING_ADD_SERVER_VALUE) {
    try {

        if(!tokenStr) return
                
        const result = await BACKEND_API("meeting", {
            method: "post",
            json : item,
            headers : {
                auth : tokenStr
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            }
        })
        .json<MEETING_POST_RESPONSE>()
        .catch<MEETING_POST_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as RESPONSE_MODEL<Error>
    }
}

export async function API_SERVER_MEETING_DETAIL(_id : string){
    try {
        const result = await BACKEND_API(`meeting/detail/${_id}`, {
            method:"get",
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            }
        })
        .json<MEETING_DETAIL_RESPONSE>()
        .catch<MEETING_DETAIL_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_DETAIL_RESPONSE
    }
}

export async function API_SERVER_MEETING_DELETE(tokenStr : string, _id : string, seq : string){
    try {
        
        const result = await BACKEND_API(`meeting/${_id}/${seq}`, {
            method:"delete",
            headers : {
                auth : tokenStr
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            },
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_PROMISE_RESPONSE
    }
}

export async function API_SERVER_MEETING_ATTEND(tokenStr : string, _id : string){
    try {

        const result = BACKEND_API(`meeting/attend/${_id}`, {
            method:"patch",
            headers : {
                auth : tokenStr
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            },
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_PROMISE_RESPONSE
    }
}

export async function API_SERVER_MEETING_ATTEND_CANCEL(tokenStr : string, _id : string){
    try {
        
        const result = BACKEND_API(`meeting/cancel/${_id}`, {
            method:"patch",
            headers : {
                auth : tokenStr
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            },
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_PROMISE_RESPONSE
    }
}

export async function API_SERVER_MEETING_UPDATE(tokenStr : string, item : MEETING_UPDATE_SERVER_VALUE) {
    try {

        if(!tokenStr) return
                
        const result = await BACKEND_API("meeting", {
            method: "patch",
            json : item,
            headers : {
                auth : tokenStr
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            }
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_PROMISE_RESPONSE
    }
}

export async function API_SERVER_MEETING_EXHIBITION(offset : number, limit : number){
    try {
        const result = await BACKEND_API("meeting/exhibition", {
            method : "get",
            searchParams : {
                offset, limit
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string],
            }
        })
        .json<MEETING_EXHIBITION_RESPONSE>()
        .catch<MEETING_EXHIBITION_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_EXHIBITION_RESPONSE
    }
}

export async function API_SERVER_MEETING_EXHIBITION_LIST_TARGET(seq : string, offset : number, limit : number){
    try {
        const result = await BACKEND_API(`meeting/exhibition/${seq}`, {
            method : "get",
            searchParams : {
                offset, limit
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string]
            }
        })
        .json<MEETING_EXHIBITION_TARGET_LIST_RESPONSE>()
        .catch<MEETING_EXHIBITION_TARGET_LIST_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_EXHIBITION_TARGET_LIST_RESPONSE
    }
}

export async function API_SERVER_MEETING_EXHIBITION_TARGET(seq : string){
    try {
        const result = await BACKEND_API(`meeting/exhibition/target/${seq}`, {
            method : "get",
        })
        .json<MEETING_EXHIBITION_TARGET_RESPONSE>()
        .catch<MEETING_EXHIBITION_TARGET_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as MEETING_EXHIBITION_TARGET_RESPONSE
    }
}