import { CLIENT_API } from "./_api.call.module";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { FAVORITE_RESPONSE, FAVORITE_ITEM } from "@/types/favorite";



export async function API_FAVORITE_LIST(){
    try {
        const result = await CLIENT_API("favorite/list")
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_FAVORITE_ADD(item : FAVORITE_ITEM){
    try {
        
        const result = await CLIENT_API("favorite/add", {
            json : DataEncrypt(item)
        })
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_FAVORITE_REMOVE(seqArr : string[]){
    try {
        const result = await CLIENT_API("favorite/remove", {
            json : DataEncrypt(seqArr)
        })
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_FAVORITE_INFO() {
    try {
        const result = await CLIENT_API("favorite/info")
        .json<FAVORITE_RESPONSE>()
        .catch<FAVORITE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}