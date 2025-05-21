export interface ID_SEARCH_FROM_VALUE {
    searchName : string,
    searchPhone : string
}

export interface ID_SEARCH_SUCCESS_DATA {
    id : string,
    createDate : string
}

export interface ID_SEARCH_BACK_END_DATA {
    name : string,
    phone : string,
}

export type ID_SEARCH_RESPONSE_SUCCESS = RESPONSE_MODEL<ID_SEARCH_SUCCESS_DATA>;
export type ID_SEARCH_RESPONSE_FAIL = RESPONSE_MODEL<null | string>;