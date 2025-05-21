import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_PW_SEARCH } from "@/api/account.server";

import { PW_SEARCH_FORM_VALUE, PW_API_RESPONSE } from "@/types/account/pw.search.change"

export async function POST(req : NextRequest){
    try {
        const { searchId, searchName, searchPhone } : PW_SEARCH_FORM_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : PW_API_RESPONSE = await API_SERVER_PW_SEARCH({
            name : searchName,
            phone : searchPhone,
            id : searchId
        });

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});  
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}