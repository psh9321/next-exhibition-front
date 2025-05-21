import { NextResponse } from "next/server";

import { DataEncrypt } from "@/util/crypto";
import { getToken } from "@/util/token";

import { API_SERVER_MEETING_PROMISE } from "@/api/meeting.server";

import { MEETING_PROMISE_RESPONSE } from "@/types/meeting"

export async function POST() {
    try {
        const token = await getToken();

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_PROMISE(token as string) as MEETING_PROMISE_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }),{status : 200});
    }
    catch(err) {
        throw NextResponse.json(err,{status : 500});
    }
}