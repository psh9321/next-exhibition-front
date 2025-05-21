import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { getToken } from "@/util/token";
import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MEETING_ATTEND_CANCEL } from "@/api/meeting.server";

import { MEETING_PROMISE_RESPONSE } from "@/types/meeting"

export async function POST(req : NextRequest){
    try {

        const _id = DataDecrypt(await req.json()) as string;

        const token = await getToken();

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_ATTEND_CANCEL(token, _id) as  MEETING_PROMISE_RESPONSE;

        revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }),{status : 200})
    }
    catch(err) {
        return NextResponse.json(err, {status : 500})
    }
}