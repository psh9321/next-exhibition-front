import { ThrowModel } from "@/util/throwModel";

import { BACKEND_API } from "./_api.call.module"

import { RESPONSE_MODEL } from "@/types/response"
import { 
    LOGIN_BACK_END_DATA, 
    LOGIN_RESPONSE_SUCCESS, 
    LOGIN_RESPONSE_FAIL 
} from "@/types/account/login"

import { 
    ID_SEARCH_BACK_END_DATA, 
    ID_SEARCH_RESPONSE_SUCCESS, 
    ID_SEARCH_RESPONSE_FAIL 
} from "@/types/account/idSearch"

import { 
    PW_SEARCH_BACK_END_DATA, 
    PW_CHANGE_BACK_END_DATA, 
    PW_API_RESPONSE 
} from "@/types/account/pw.search.change"

import { 
    EMAIL_SEND_RESPONSE, 
    REGISTER_API_RESPONSE, 
    REGISTER_BACK_END_PARAMS 
} from "@/types/account/register"

/** 로그인 */
export async function API_SERVER_LOGIN(params : LOGIN_BACK_END_DATA){
    try {
        const result = await BACKEND_API(`account/login`, {
            method: "post",
            json: params,
        }).json<LOGIN_RESPONSE_SUCCESS>()
        .catch<LOGIN_RESPONSE_FAIL>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as LOGIN_RESPONSE_FAIL;
    }
}

export async function API_SERVER_ID_SEARCH(params : ID_SEARCH_BACK_END_DATA) {
    try {
        const result = await BACKEND_API("account/idSearch", {
            method: "post",
            json: params,
        }).json<ID_SEARCH_RESPONSE_SUCCESS>()
        .catch<ID_SEARCH_RESPONSE_FAIL>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as ID_SEARCH_RESPONSE_FAIL;
    }
}

export async function API_SERVER_PW_SEARCH(params : PW_SEARCH_BACK_END_DATA) {
    try {
        const result = await BACKEND_API("account/pwSearch", {
            method: "post",
            json: params,
        }).json<PW_API_RESPONSE>()
        .catch<PW_API_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as PW_API_RESPONSE;
    }
}

export async function API_SERVER_PW_CHANGE(params : PW_CHANGE_BACK_END_DATA) {
    try {
        
        const result = await BACKEND_API("account/pwChange", {
            method: "patch",
            json: params,
        }).json<PW_API_RESPONSE>()
        .catch<PW_API_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as PW_API_RESPONSE;
    }
}

export async function API_SERVER_REGISTER_EMAIL_AUTH(params : {
    user : string
}){
    try {
        const result = await BACKEND_API("mail/auth", {
            method: "post",
            json : params
    
        }).json<EMAIL_SEND_RESPONSE>()
        .catch<EMAIL_SEND_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as EMAIL_SEND_RESPONSE;
    }
}

export async function API_SERVER_REGISTER_PHONE_CHECK(params : {
    phone : string,
    agency : string
}){
    try {
        const result = await BACKEND_API("account/phoneCheck", {
            method: "post",
            json : params
    
        }).json<REGISTER_API_RESPONSE>()
        .catch<REGISTER_API_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as REGISTER_API_RESPONSE;
    }
}

export async function API_SERVER_REGISTER_SUBMIT(params : REGISTER_BACK_END_PARAMS){
    try {
        const result = await BACKEND_API("account/register", {
            method: "post",
            json : params
    
        }).json<REGISTER_API_RESPONSE>()
        .catch<REGISTER_API_RESPONSE>();

        return result
    }
    catch(err) {
        const error = ThrowModel(err as Error | RESPONSE_MODEL<string | object>);

        return error as REGISTER_API_RESPONSE;
    }
}