import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { getToken } from "@/util/token";
import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_MEETING_DELETE } from "@/api/meeting.server";

import { MEETING_PROMISE_RESPONSE, MEETING_DELETE_CLIENT_PARAMS } from "@/types/meeting"

export async function POST(req : NextRequest){
    try {
        
        const token = await getToken();

        const { deleteId, seq } = DataDecrypt(await req.json()) as MEETING_DELETE_CLIENT_PARAMS;

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_DELETE(token, deleteId, seq) as MEETING_PROMISE_RESPONSE;

        await revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string);
        await revalidateTag("promise");

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200})
    }
    catch(err) {
        throw NextResponse.json(err, {status : 200})
    }
}