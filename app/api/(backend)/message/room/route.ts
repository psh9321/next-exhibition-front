import { NextResponse } from "next/server";

import { getToken } from "@/util/token";
import { DataEncrypt } from "@/util/crypto";

import { API_SERVER_MESSAGE_GET } from "@/api/message.server";

import { MESSAGE_ROOM_RESPONSE } from "@/types/message"

export async function POST(){
    try {
        const token = await getToken();

        const { resultCode, data, errMsg } = await API_SERVER_MESSAGE_GET(token) as MESSAGE_ROOM_RESPONSE;

        // revalidateTag(process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"] as string)
        
        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}