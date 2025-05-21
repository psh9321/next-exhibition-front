
import { getToken } from "@/util/token";
import { ThrowModel } from "@/util/throwModel";
import { BACKEND_API } from "./_api.call.module";

import { RESPONSE_MODEL } from "@/types/response"
import { FILE_UPLOAD_RESPONSE } from "@/types/files"


export async function API_SERVER_UPLOAD_FILES(filesData : FormData){
    try {
        const result = await BACKEND_API("files", {
            method: "post",
            body : filesData
        })
        .json<FILE_UPLOAD_RESPONSE>()
        .catch<FILE_UPLOAD_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as FILE_UPLOAD_RESPONSE
    }
}

export async function API_SERVER_UPLOAD_PROFILE_IMG(filesData : FormData){

    try {
        const result = await BACKEND_API("files/profileImg", {
            method: "post",
            body : filesData,
            headers : {
                auth : await getToken()
            }
        })
        .json<FILE_UPLOAD_RESPONSE>()
        .catch<FILE_UPLOAD_RESPONSE>();

        return result
    }
    catch(err) {
        console.log(err,"eee")
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as FILE_UPLOAD_RESPONSE
    }
}

