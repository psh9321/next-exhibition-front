import { RESPONSE_MODEL } from "./response"

export interface URL_QUERY_PARAMS {
    offset? : string, 
    limit? : string,  
    // [key: string]: string | undefined;
}

export interface SERVER_LIST_INTER_FACE {
    searchParams : URL_QUERY_PARAMS,
}

export interface SERVER_DETAIL_INTERFACE {
    params : {
        _id : string
    }
}

export interface WRITE_ITEM {
    title : string,
    contents : string,
    createDate : string,
    updateDate : string,
    _id : string,
    id : string,
    thumbnail? : {
        fileName : string,
        originName : string
    },
    isRepresentative? : boolean,
    pageIdx? : number
}

export interface GREETING_FORM_VALUE {
    greetingTitle : string,
    greetingContents : string,
    greetingRepresentative : boolean
}

export interface GREETING_LIST_RESPONSE_DATA {
    greeting : WRITE_ITEM[],
    total : number,
    representative : WRITE_ITEM
}

export type WRITE_LIST_RESPONSE = RESPONSE_MODEL<GREETING_LIST_RESPONSE_DATA | null>;