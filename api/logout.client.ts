import { CLIENT_API } from "./_api.call.module";

import { DataDecrypt } from "@/util/crypto";

import { RESPONSE_MODEL } from "@/types/response";

export async function API_LOGOUT(){
    try {
        const result = await CLIENT_API("logout")
        .json<RESPONSE_MODEL<null>>()
        .catch<RESPONSE_MODEL<null>>(); 

        return DataDecrypt(result)["resultCode"]
    }
    catch(err) {
        throw err;
    }
}