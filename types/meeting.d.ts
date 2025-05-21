import { RESPONSE_MODEL } from "./response";

export interface ADD_METTING_PAGE_PARAMS {
    seq : string
}

export interface MEETING_FORM_VALUE {
    meetingMembersLength : number,
    meetingDate : string,
    meetingTitle : string,
    meetingContents? : string
}

export interface MEETING_ADD_CLIENT_VALUE extends MEETING_FORM_VALUE{
    exhibitionImg : string,
    exhibitionTitle : string,
    exhibitionStartDate : string,
    exhibitionEndDate : string,
    exhibitionPlace : string,
    exhibitionArea : string,
    exhibitionPrice : string,
    exhibitionType : string,
    seq : string,
}

export interface MEETING_UPDATE_CLIENT_VALUE extends MEETING_FORM_VALUE {
    _id : string,
    seq : string,
}

export interface MEETING_ADD_SERVER_VALUE {
    title : string,
    membersTotal : number,
    date : string,
    seq : string,
    contents? : string,
    exhibitionImg : string,
    exhibitionTitle : string,
    exhibitionStartDate : string,
    exhibitionEndDate : string,
    exhibitionPlace : string,
    exhibitionArea : string,
    exhibitionPrice : string,
    exhibitionType : string,
}

export interface MEETING_UPDATE_SERVER_VALUE {
    title : string,
    membersTotal : number,
    date : string,
    seq : string,
    contents? : string,
    _id : string,
    seq : string,
}

export interface MEETING_LIST_MEMBERS {
    id : string,
    name : string,
    area : string,
    profileImg : string,
}

export interface MEETING_ITEM {
    title : string,
    membersTotal : number,
    contents : string,
    date : string,
    seq : string,
    createUserId : string,
    createUserImg : string,
    createUserNickName : string,
    createUserKey : string,
    members : MEETING_LIST_MEMBERS[],
    createDate : string,
    exhibitionImg : string,
    exhibitionTitle : string,
    exhibitionStartDate : string,
    exhibitionEndDate : string,
    _id : string,
}

export interface MEETING_LIST_RESPONSE_DATA {
    total : number,
    meeting : MEETING_ITEM[]
}

export interface MEETING_EXHIBITION_TARGET_DATA {
    total : number,
    meetingTargetList :  MEETING_ITEM[]
}

export interface MEETING_PROMISE_RESPONSE_DATA {
    total : number,
    promise : MEETING_ITEM[]
}

export interface MEETING_SEARCH_PARAMS {
    offset : string,
    limit : string,
    seq? : string,
    keyword? : string,
    meetingDate? : string
} 

export interface MEMBERS_INFO {
    id : string
    nickName : string
    area : string
    gender : number
    profileImg : string,
    key : string
}

export interface MEETING_DETAIL_RESPONSE_DATA {
    meetingInfo : MEETING_ITEM,
    membersInfo : MEMBERS_INFO[]
}

export interface MEETING_DELETE_CLIENT_PARAMS {
    deleteId : string,
    seq : string
}

export interface MEETING_EXHIBITION_ITEM {
    _id : string,
    exhibitionImg : string,
    exhibitionTitle : string,
    exhibitionStartDate : string,
    exhibitionEndDate : string,
    exhibitionPlace : string,
    exhibitionArea : string,
    exhibitionPrice : string,
    exhibitionType : string,
    seq : string,
}

export interface MEETINGEXHIBITION_RESPONSE_DATA {
    total : number,
    meetingExhibition : MEETING_EXHIBITION_ITEM[]
}

export type MEETING_PROMISE_RESPONSE = RESPONSE_MODEL<MEETING_PROMISE_DATA | null>;

export type MEETING_LIST_RESPONSE = RESPONSE_MODEL<MEETING_LIST_RESPONSE_DATA | null>;

export type MEETING_POST_RESPONSE = RESPONSE_MODEL<null>;

export type MEETING_DETAIL_RESPONSE = RESPONSE_MODEL<MEETING_DETAIL_RESPONSE_DATA | null>

export type MEETING_ATTEND_OR_CANCEL_RESPONSE = RESPONSE_MODEL<null>

export type MEETING_EXHIBITION_RESPONSE = RESPONSE_MODEL<MEETINGEXHIBITION_RESPONSE_DATA | null>

export type MEETING_EXHIBITION_TARGET_LIST_RESPONSE = RESPONSE_MODEL<MEETING_EXHIBITION_TARGET_DATA | null>

export type MEETING_EXHIBITION_TARGET_RESPONSE = RESPONSE_MODEL<MEETING_EXHIBITION_ITEM | null>


