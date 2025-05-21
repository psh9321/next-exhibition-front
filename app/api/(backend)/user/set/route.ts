import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_USER_PATCH } from "@/api/user.server";

import { GET_USER_RESPONSE } from "@/types/user"
import { USER_FORM_VALUE } from "@/types/user"

export async function POST(req : NextRequest) {
    try {
        const { userArea, userImg, userNickName } : USER_FORM_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } = await API_SERVER_USER_PATCH({
            nickName : userNickName as string,
            area : userArea,
            profileImg : userImg
        }) as GET_USER_RESPONSE;

        revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        throw err
    }
}