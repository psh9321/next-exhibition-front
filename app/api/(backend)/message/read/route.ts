import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/util/token";
import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MESSAGE_READ } from "@/api/message.server";

import { MESSAGE_READ_API_PARAMS } from "@/types/message"



export async function POST(req : NextRequest) {
    try {

        const token = await getToken();

        const { reader, sender } = DataDecrypt(await req.json()) as MESSAGE_READ_API_PARAMS;

        const { resultCode, data, errMsg } = await API_SERVER_MESSAGE_READ(token, reader, sender);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}