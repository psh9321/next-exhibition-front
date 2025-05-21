import { CLIENT_API } from "./_api.call.module"

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { GET_USER_RESPONSE, USER_FORM_VALUE } from "@/types/user"

export async function API_USER_GET(){
    try {
        const result = await CLIENT_API("user/info")
        .json<GET_USER_RESPONSE>()
        .catch<GET_USER_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err;
    }
}

export async function API_USER_SET(data : USER_FORM_VALUE){
    try {
        const result = await CLIENT_API("user/set", {
            json : DataEncrypt(data)
        })
        .json<GET_USER_RESPONSE>()
        .catch<GET_USER_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}