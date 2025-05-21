import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_PW_CHANGE } from "@/api/account.server";

import { PW_CHANGE_PARAM, PW_API_RESPONSE } from "@/types/account/pw.search.change"

export async function POST(req : NextRequest){
    try {
        const { searchId, searchName, searchPhone, changePw } : PW_CHANGE_PARAM = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : PW_API_RESPONSE = await API_SERVER_PW_CHANGE({
            name : searchName,
            phone : searchPhone,
            id : searchId,
            newPw : changePw
        });

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});  
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}