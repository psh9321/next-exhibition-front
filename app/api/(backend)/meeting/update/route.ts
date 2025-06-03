import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";
import { getToken } from "@/util/token";

import { MEETING_UPDATE_CLIENT_VALUE, MEETING_POST_RESPONSE } from "@/types/meeting"
import { API_SERVER_MEETING_UPDATE } from "@/api/meeting.server";

export async function POST(req : NextRequest) {
    try {
        const token = await getToken() as string;

        const { meetingDate, meetingMembersLength, meetingTitle, meetingContents, seq, _id } : MEETING_UPDATE_CLIENT_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_UPDATE(token, {
            title : meetingTitle,
            membersTotal : meetingMembersLength,
            contents : meetingContents,
            date : meetingDate,
            seq,
            _id
        }) as MEETING_POST_RESPONSE;

        revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200})
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}