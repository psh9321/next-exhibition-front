import { NextResponse } from "next/server";

import { getToken } from "@/util/token";
import { DataEncrypt } from "@/util/crypto";

import { API_SERVER_USER_GET } from "@/api/user.server";

import { GET_USER_RESPONSE } from "@/types/user"




export async function POST() {
    try {
        
        const token = await getToken();

        const { resultCode, data, errMsg } = await API_SERVER_USER_GET(token) as GET_USER_RESPONSE;

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        console.log(err,"user/info catch /api/(backend)/user/info/route.ts")
        throw NextResponse.json(err, {status : 500});
    }
}