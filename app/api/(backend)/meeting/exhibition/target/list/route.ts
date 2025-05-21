import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MEETING_EXHIBITION_LIST_TARGET } from "@/api/meeting.server";

import { MEETING_LIST_RESPONSE } from "@/types/meeting"

export async function POST(req : NextRequest) {
    try {
        const { seq, offset, limit } = DataDecrypt(await req.json()) as {
            seq : string
            offset : number,
            limit : number
        };

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_EXHIBITION_LIST_TARGET(seq, offset, limit) as MEETING_LIST_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200})
    }
    catch(err) {
        return NextResponse.json(err, {status : 500})
    }
}