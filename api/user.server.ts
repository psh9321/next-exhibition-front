
import { ThrowModel } from "@/util/throwModel";
import { getToken } from "@/util/token";

import { BACKEND_API } from "./_api.call.module"

import { RESPONSE_MODEL } from "@/types/response"
import { GET_USER_RESPONSE, USER_INFO_PATCH } from "@/types/user"




export async function API_SERVER_USER_GET(cookieStr : string | null){

    try {
        
        if(!cookieStr) return null
        
        const result = await BACKEND_API("user", {
            method : "get",
            headers : {
                auth : cookieStr
            }
        })
        .json<GET_USER_RESPONSE>()
        .catch<GET_USER_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as GET_USER_RESPONSE
    }
}

export async function API_SERVER_USER_PATCH(data : USER_INFO_PATCH){
    
    try {

        const result = await BACKEND_API("user", {
            method: "patch",
            headers : {
                auth : await getToken()
            },
            json : data,
        })
        .json<GET_USER_RESPONSE>()
        .catch<GET_USER_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as GET_USER_RESPONSE
    }
}
