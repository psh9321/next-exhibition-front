import { CLIENT_API } from "./_api.call.module"

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { MEETING_ADD_CLIENT_VALUE, MEETING_SEARCH_PARAMS, MEETING_LIST_RESPONSE, MEETING_PROMISE_RESPONSE, MEETING_UPDATE_CLIENT_VALUE, MEETING_DELETE_CLIENT_PARAMS, MEETING_EXHIBITION_RESPONSE, MEETING_EXHIBITION_TARGET_LIST_RESPONSE } from "@/types/meeting"

export async function API_MEETING_LIST(params : MEETING_SEARCH_PARAMS) {
    try {
        const result = await CLIENT_API("meeting/list", {
            json : DataEncrypt(params)
        })
        .json<MEETING_LIST_RESPONSE>()
        .catch<MEETING_LIST_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MEETING_PROMISE(){
    try {
        const result = await CLIENT_API("meeting/promise")
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
        
    }
    catch(err) {
        throw err
        // console.log("client meeting err",err)
    }
}

export async function API_MEETING_ADD(params : MEETING_ADD_CLIENT_VALUE) {
    try {
        const result = await CLIENT_API("meeting/add", {
            json : DataEncrypt(params)
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
} 

export async function API_MEETING_DELETE(params : MEETING_DELETE_CLIENT_PARAMS) {
    try {
        const result = await CLIENT_API("meeting/delete", {
            json : DataEncrypt(params)
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MEETING_ATTEND(objId : string){
    try {
        
        const result = await CLIENT_API("meeting/attend", {
            json : DataEncrypt(objId)
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        console.log("ee",err)
        throw err
    }
}

export async function API_MEETING_ATTEND_CANCEL(objId : string){
    try {
        const result = await CLIENT_API("meeting/attendCancel", {
            json : DataEncrypt(objId)
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MEETING_UPDATE(params : MEETING_UPDATE_CLIENT_VALUE) {
    try {
        const result = await CLIENT_API("meeting/update", {
            json : DataEncrypt(params)
        })
        .json<MEETING_PROMISE_RESPONSE>()
        .catch<MEETING_PROMISE_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MEETING_EXHIBITION_LIST(offset : number, limit : number){
    try {
        const result = await CLIENT_API("meeting/exhibition", {
            json : DataEncrypt({ offset, limit })
        })
        .json<MEETING_EXHIBITION_RESPONSE>()
        .catch<MEETING_EXHIBITION_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {        
        throw err
    }
}

export async function API_MEETING_EXHIBITION_TARGET_LIST(seq : string, offset : number, limit : number) {
    try {
        const result = await CLIENT_API("meeting/exhibition/target/list", {
            json : DataEncrypt({ seq, offset, limit })
        })
        .json<MEETING_EXHIBITION_TARGET_LIST_RESPONSE>()
        .catch<MEETING_EXHIBITION_TARGET_LIST_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}