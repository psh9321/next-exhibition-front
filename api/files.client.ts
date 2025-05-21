import { CLIENT_API } from "./_api.call.module"

import { FILE_UPLOAD_RESPONSE } from "@/types/files"

import { DataDecrypt } from "@/util/crypto";

export async function API_UPLOAD_PROFILE_IMG(files : FormData){
    try {
        const result = await CLIENT_API("files/profileImg", {
            body : files,
        })
        .json<FILE_UPLOAD_RESPONSE>()
        .catch<FILE_UPLOAD_RESPONSE>();

        return DataDecrypt(result)["data"]
    }
    catch(err) {
        throw err
    }
}