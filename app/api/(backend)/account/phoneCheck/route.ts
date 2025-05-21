import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_REGISTER_PHONE_CHECK } from "@/api/account.server";

import { REGISTER_PHONE_CHECK, REGISTER_API_RESPONSE } from "@/types/account/register"

export async function POST(req : NextRequest) {
    try {
        const { registerPhone, registerPhoneAgency } : REGISTER_PHONE_CHECK = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : REGISTER_API_RESPONSE = await API_SERVER_REGISTER_PHONE_CHECK({
            phone : registerPhone,
            agency : registerPhoneAgency
        });

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});             
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}