import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";
import { getToken } from "@/util/token";

import { API_SERVER_MEETING_ADD } from "@/api/meeting.server";

import { MEETING_ADD_CLIENT_VALUE, MEETING_POST_RESPONSE } from "@/types/meeting"

export async function POST(req : NextRequest){
    try {

        const token = await getToken();

        if(!token) {

            const response = {
                resultCode : -99, 
                data : null, 
                errMsg : "토큰 없음" 
            }

            return NextResponse.json(response, {status : 200})
        }

        const { meetingDate, meetingMembersLength, meetingTitle, meetingContents, seq, exhibitionImg, exhibitionTitle, exhibitionStartDate, exhibitionEndDate, exhibitionArea, exhibitionPlace, exhibitionPrice, exhibitionType } : MEETING_ADD_CLIENT_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } = await API_SERVER_MEETING_ADD(token, {
            title : meetingTitle,
            membersTotal : meetingMembersLength,
            contents : meetingContents,
            date : meetingDate,
            seq,
            exhibitionTitle,
            exhibitionImg,
            exhibitionStartDate, 
            exhibitionEndDate,
            exhibitionArea, 
            exhibitionPlace, 
            exhibitionPrice, 
            exhibitionType
        }) as MEETING_POST_RESPONSE;

        await revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200})
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}