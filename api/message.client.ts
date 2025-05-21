import { CLIENT_API } from "./_api.call.module"

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { MESSAGE_ROOM_RESPONSE, MESSAGE_DATA_RESPONSE, MESSAGE_READ_RESPONSE } from "@/types/message"

export async function API_MESSAGE_GET(){
    try {
        const result = await CLIENT_API("message/room")
        .json<MESSAGE_ROOM_RESPONSE>()
        .catch<MESSAGE_ROOM_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MESSAGE_DATA(anotherId : string, offset : number, limit : number){
    try {
        const result = await CLIENT_API("message/data", {
            json : DataEncrypt({ anotherId, offset, limit })
        })
        .json<MESSAGE_DATA_RESPONSE>()
        .catch<MESSAGE_DATA_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}

export async function API_MESSAGE_READ(reader : string, sender : string) {
    try {
        const result = await CLIENT_API("message/read", {
            json : DataEncrypt({ reader, sender })
        })
        .json<MESSAGE_READ_RESPONSE>()
        .catch<MESSAGE_READ_RESPONSE>();

        return DataDecrypt(result)
    }
    catch(err) {
        throw err
    }
}