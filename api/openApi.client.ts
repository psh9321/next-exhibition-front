import { CLIENT_API } from "./_api.call.module";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { CLIENT_EXHIBITION_API_PARAMS, EXHIBITION_API_RESPONSE } from "@/types/exhibition"

export async function API_GET_EXHIBITION({
    offset = 1,
    limit = 20,
    type = "A",
    sortNum = 1,
    ...rest
} : CLIENT_EXHIBITION_API_PARAMS){
    try {
        
        const result = await CLIENT_API("openApi", {
            json : DataEncrypt({
                offset,
                limit,
                type,
                sortNum,
                ...rest
            })
        })
        .json<EXHIBITION_API_RESPONSE>();
        
        return DataDecrypt(result)
    }
    catch(err) {
        console.log("ee",err)
        return err
    }
}