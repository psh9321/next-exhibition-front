export interface PW_SEARCH_FORM_VALUE {
    searchId : string, /** 아이디 */
    searchName : string, /** 이메일 */
    searchPhone : string, /** 폰번호 */
}

export interface PW_CHANGE_FORM_VALUE {
    changePw : string, /** 비밀번호 */
    changePwCheck : string, /** 비밀번호 확인 */
}

export interface PW_SEARCH_BACK_END_DATA {
    id : string,
    name : string,
    phone : string
}

export interface PW_CHANGE_BACK_END_DATA extends PW_SEARCH_BACK_END_DATA {
    newPw : string
}

export type PW_CHANGE_PARAM = PW_SEARCH_FORM_VALUE&PW_CHANGE_FORM_VALUE;
export type PW_API_RESPONSE = RESPONSE_MODEL<null | string>;