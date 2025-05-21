import { NextRequest, NextResponse } from "next/server";

import { setToken } from "@/util/token";
import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_LOGIN } from "@/api/account.server";

import { LOGIN_FORM_VALUE, LOGIN_RESPONSE_SUCCESS, LOGIN_RESPONSE_FAIL } from "@/types/account/login"


export async function POST(req : NextRequest) {
    try {
       
        const { loginId, loginPw } : LOGIN_FORM_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : LOGIN_RESPONSE_SUCCESS | LOGIN_RESPONSE_FAIL = await API_SERVER_LOGIN({
            id : loginId, 
            pw : loginPw
        })

        if(resultCode === 200 && data) setToken(data as string);

        return NextResponse.json(DataEncrypt({ resultCode, data : null, errMsg }), {status : 200});                
    }
    catch(err) {
        
        throw NextResponse.json(err, {status : 500});
    }
}