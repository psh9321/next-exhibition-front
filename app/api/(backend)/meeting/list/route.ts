import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MEETING_LIST } from "@/api/meeting.server";

import { MEETING_SEARCH_PARAMS, MEETING_LIST_RESPONSE } from "@/types/meeting";

export async function POST(req : NextRequest) {
    try {
        const params : MEETING_SEARCH_PARAMS = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_LIST(params)
        .then<MEETING_LIST_RESPONSE>()
        .catch<MEETING_LIST_RESPONSE>();

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200})
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500})
    }
}