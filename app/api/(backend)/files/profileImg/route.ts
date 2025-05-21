import { NextRequest, NextResponse } from "next/server";

import { DataEncrypt } from "@/util/crypto";

import { API_SERVER_UPLOAD_PROFILE_IMG } from "@/api/files.server";

import { FILE_UPLOAD_RESPONSE } from "@/types/files"


export async function POST(req : NextRequest) {
    try {
        const paramsData = await req.formData();

        const dataArr = Array.from(paramsData.getAll("item"));

        const formData = new FormData();

        for(let i = 0; i < dataArr.length; i++) formData.append("filesData",dataArr[i]);

        const { resultCode, data, errMsg } : FILE_UPLOAD_RESPONSE = await API_SERVER_UPLOAD_PROFILE_IMG(formData);

        return NextResponse.json(DataEncrypt({ resultCode, data, errMsg }), {status : 200}); 
    }
    catch(err) {
        throw err
    }
}