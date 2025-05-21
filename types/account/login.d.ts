import { RESPONSE_MODEL } from "../response"

export interface LOGIN_FORM_VALUE {
    loginId : string,
    loginPw : string
}

export interface LOGIN_BACK_END_DATA {
    id : string,
    pw : string
}

export type LOGIN_RESPONSE_SUCCESS = RESPONSE_MODEL<string | null>;
export type LOGIN_RESPONSE_FAIL = RESPONSE_MODEL<null | string>;