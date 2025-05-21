import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_REGISTER_EMAIL_AUTH } from "@/api/account.server";

import { EMAIL_SEND_RESPONSE } from "@/types/account/register"

export async function POST(req : NextRequest) {
    try {
        const registerEmail = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : EMAIL_SEND_RESPONSE = await API_SERVER_REGISTER_EMAIL_AUTH({
            user : registerEmail
        })
    
        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});  
    }
    catch(err) {
        console.log(err,"emailAuth catch /api/(backend)/account/emailAuth/route.ts")
        throw NextResponse.json(err, {status : 500});
    }
}