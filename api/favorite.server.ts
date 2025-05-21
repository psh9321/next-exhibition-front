
import { ThrowModel } from "@/util/throwModel";
import { getToken } from "@/util/token";
import { catchTime } from "@/util/catchTime";

import { BACKEND_API } from "./_api.call.module"

import { RESPONSE_MODEL } from "@/types/response"
import { FAVORITE_RESPONSE, FAVORITE_ITEM } from "@/types/favorite";




export async function API_SERVER_FAVORITE_LIST(cookieStr : string){
    try {
        if(!cookieStr) return null
        
        const result = await BACKEND_API("favorite", {
            method : "get",
            headers : {
                auth : cookieStr
            },
            next : {
                revalidate : catchTime,
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"] as string]
            },
        })
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);
        
        return error as FAVORITE_RESPONSE
    }
}

export async function API_SERVER_FAVORITE_ADD(item : FAVORITE_ITEM){
    try {
        const token = await getToken();
        
        const result = await BACKEND_API("favorite", {
            method : "post",
            json : item,
            headers : {
                auth : token
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"] as string]
            }
        })
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as FAVORITE_RESPONSE
    }
}

export async function API_SERVER_FAVORITE_REMOVE(seqArr : string[]){
    try {
        const token = await getToken();

        const result = await BACKEND_API("favorite", {
            method : "delete",
            json : seqArr,
            headers : {
                auth : token
            },
            next : {
                tags : [process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"] as string]
            }
        })
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as FAVORITE_RESPONSE
    }
}