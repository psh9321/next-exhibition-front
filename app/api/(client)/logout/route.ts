
import { NextResponse } from "next/server";

import { deleteToken } from "@/util/token";
import { DataEncrypt } from "@/util/crypto";
import { revalidateTag } from "next/cache";

export async function POST() {
    try {
        const deleteError = await deleteToken();

        return NextResponse.json(DataEncrypt({ resultCode : deleteError ? 403 : 200, data : null, errMsg : "" }), {status : 200});                
    }
    catch(err) {
        throw NextResponse.json(err, {status : 500});
    }
}