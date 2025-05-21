import { NextRequest, NextResponse } from "next/server";

import { DataDecrypt, DataEncrypt } from "@/util/crypto";

import { API_SERVER_ID_SEARCH } from "@/api/account.server";

import { ID_SEARCH_FROM_VALUE, ID_SEARCH_RESPONSE_SUCCESS, ID_SEARCH_RESPONSE_FAIL } from "@/types/account/idSearch"

export async function POST(req : NextRequest) {
    try {
        const { searchName, searchPhone } : ID_SEARCH_FROM_VALUE = DataDecrypt(await req.json());

        const { resultCode, data, errMsg } : ID_SEARCH_RESPONSE_SUCCESS |
        ID_SEARCH_RESPONSE_FAIL = await API_SERVER_ID_SEARCH({
            name : searchName,
            phone : searchPhone
        });

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200});                
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
} 