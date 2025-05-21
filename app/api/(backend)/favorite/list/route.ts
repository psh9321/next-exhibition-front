import { NextResponse } from "next/server";

import { getToken } from "@/util/token";
import { DataEncrypt } from "@/util/crypto";

import { API_SERVER_FAVORITE_LIST } from "@/api/favorite.server";

import { FAVORITE_RESPONSE } from "@/types/favorite";

export async function POST() {
    try {
        
        const token = await getToken();

        const { resultCode, data, errMsg } = await API_SERVER_FAVORITE_LIST(token) as FAVORITE_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        
        console.log(err,"/api/(backend)/favorite/list/route.ts");
        throw NextResponse.json(err, {status : 500});
    }
}