import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/util/token";
import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MESSAGE_DATA } from "@/api/message.server";

import { MESSAGE_DATA_CLIENT_PARAMS, MESSAGE_DATA_RESPONSE } from "@/types/message";

export async function POST(req : NextRequest) {
    try {

        const token = await getToken();

        const { anotherId, offset, limit } = DataDecrypt(await req.json()) as MESSAGE_DATA_CLIENT_PARAMS;

        const { resultCode, data, errMsg } = await API_SERVER_MESSAGE_DATA(token, anotherId, offset, limit) as MESSAGE_DATA_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}