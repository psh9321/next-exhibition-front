import { CLIENT_API } from "./_api.call.module"

import { DataEncrypt, DataDecrypt } from "@/util/crypto";

import { LOGIN_FORM_VALUE, LOGIN_RESPONSE_SUCCESS, LOGIN_RESPONSE_FAIL } from "@/types/account/login"
import { REGISTER_PHONE_CHECK, REGISTER_API_RESPONSE, REGISTER_FORM_VALUE } from "@/types/account/register"

export async function API_ACCOUNT_LOGIN(data : LOGIN_FORM_VALUE){

    try {
        const result = await CLIENT_API("account/login", {
            json : DataEncrypt(data)
        })
        .json<LOGIN_RESPONSE_SUCCESS>()
        .catch<LOGIN_RESPONSE_FAIL>(); 
        
        return DataDecrypt(result)["resultCode"];
    }
    catch(err) {
        console.log("err",err)
        throw err
    }
}

import { ID_SEARCH_FROM_VALUE, ID_SEARCH_RESPONSE_SUCCESS, ID_SEARCH_RESPONSE_FAIL } from "@/types/account/idSearch"

export async function API_ACCOUNT_ID_SEARCH(data : ID_SEARCH_FROM_VALUE) {
    try {
        const result = await CLIENT_API("account/idSearch", {
            json : DataEncrypt(data)
        })
        .json<ID_SEARCH_RESPONSE_SUCCESS>()
        .catch<ID_SEARCH_RESPONSE_FAIL>(); 
        
        return DataDecrypt(result)["data"];
    }
    catch(err) {
        throw err
    }
}

import { PW_SEARCH_FORM_VALUE, PW_CHANGE_PARAM, PW_API_RESPONSE } from "@/types/account/pw.search.change"

export async function API_ACCOUNT_PW_SEARCH(data : PW_SEARCH_FORM_VALUE) {
    try {
        
        const result = await CLIENT_API("account/pwSearch", {
            json : DataEncrypt(data)
        })
        .json<PW_API_RESPONSE>()
        .catch<PW_API_RESPONSE>();
        
        return DataDecrypt(result)["resultCode"] === 200;
    }
    catch(err) {
        throw err
    }
}

export async function API_ACCOUNT_PW_CHANGE(data : PW_CHANGE_PARAM) {
    try {
        const result = await CLIENT_API("account/pwChange", {
            json : DataEncrypt(data)
        })
        .json<PW_API_RESPONSE>()
        .catch<PW_API_RESPONSE>();
        
        return DataDecrypt(result)["resultCode"] === 200;
    }
    catch(err) {
        throw err;
    }
}

import { EMAIL_SEND_RESPONSE } from "@/types/account/register"

export async function API_SEND_EMAIL_AUTH(email : string){
    try {
        const result = await CLIENT_API("account/emailAuth", {
            json : DataEncrypt(email)
        })
        .json<EMAIL_SEND_RESPONSE>()
        .catch<EMAIL_SEND_RESPONSE>();
        
        return DataDecrypt(result);
    }
    catch(err) {
        throw err;
    }
}

export async function API_PHONE_CHECK(params : REGISTER_PHONE_CHECK){
    try {
        const result = await CLIENT_API("account/phoneCheck", {
            json : DataEncrypt(params)
        })
        .json<REGISTER_API_RESPONSE>()
        .catch<REGISTER_API_RESPONSE>();
        
        return DataDecrypt(result)["resultCode"];
    }
    catch(err) {
        throw err;
    }
}

export async function API_REGISTER_SUBMIT(params : REGISTER_FORM_VALUE){
    try {
        const result = await CLIENT_API("account/register", {
            json : DataEncrypt(params)
        })
        .json<REGISTER_API_RESPONSE>()
        .catch<REGISTER_API_RESPONSE>();
        
        return DataDecrypt(result)["resultCode"];
    }
    catch(err) {
        throw err;
    }
}