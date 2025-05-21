import { ThrowModel } from "@/util/throwModel";

import { BACKEND_API } from "./_api.call.module"

import { RESPONSE_MODEL } from "@/types/response"
import { AUTH_TOKEN_RESPONSE } from "@/types/auth"

/** 토큰 유효성 검사 */
export async function API_SERVER_AUTH(tokenStr : string){
    try {

        const result = await BACKEND_API(`verify/token`, {
            method: "get",
            headers : {
                auth : tokenStr
            },
            cache : "no-store"
        }).json<AUTH_TOKEN_RESPONSE>()
        .catch<AUTH_TOKEN_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as RESPONSE_MODEL<Error>
    }
}
