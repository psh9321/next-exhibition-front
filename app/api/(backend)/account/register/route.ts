import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_REGISTER_SUBMIT } from "@/api/account.server"

import { REGISTER_FORM_VALUE, REGISTER_API_RESPONSE } from "@/types/account/register"

export async function POST(req : NextRequest) {
    try {
        const { 
            registerEmail, /** registerReceiveEmail, */
            registerPw, 
            registerName, registerNickName,
            registerBirth, 
            registerPhone, registerPhoneAgency, 
            registerGender,
            registerArea,
        } : REGISTER_FORM_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : REGISTER_API_RESPONSE = await API_SERVER_REGISTER_SUBMIT({
            id : registerEmail,
            pw : registerPw,
            name : registerName,
            nickName : registerNickName,
            birth : registerBirth,
            phone : registerPhone,
            phoneAgency : registerPhoneAgency,
            gender : registerGender,
            area : registerArea,
        });

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});        
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}