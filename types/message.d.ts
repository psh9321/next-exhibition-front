import { RESPONSE_MODEL } from "./response"

export interface USER_RECIVER {
    id : string,
    area : string,
    nickName : string,
    profileImg : string,
}

export interface SEND_MESSAGE {
    senderId : string,
    reciverId : string,
    message : string 
}

export interface MESSAGE_ITEM {
    ids : string[], /** 채팅방 참여 유저 Objid */
    message : string, /** 매세지 내용 */
    isRead : string[], /** 읽음 여부 */
}

export interface MESSAGE_ROOM_ITEM {
    ids : string[], /** 채팅방 참여 유저 Objid */
    /** 마지막 메세지 */
    lastMessage : {
        isRead : string[], /** 읽음 여부 */
        message : string, /** 매세지 내용 */
        sendDate : Date | string, /** 발송 시간 */
        sender : string
    },
    _id? : string
}

export interface MESSAGE_ROOM_USER_DATA {
    [key : string] : {
        id : string, /** 유저 아이디 */
        profileImg : string, /** 유저 프로필 이미지 */
        nickName : string, /** 유저 닉네임 */
        _id? : string
    }
}

export interface MESSAGE_ROOM_RESPONSE_DATA {
    roomInfo : MESSAGE_ROOM_ITEM,
    users : MESSAGE_ROOM_USER_DATA,
    unReadMessage : number
}

export interface MESSAGE_ROOM_DATA_ITEM {
    ids : string[],
    isRead : string[],
    message : string,
    sendDate : string,
    sender : string,
}

export interface MESSAGE_ITEMS_RESPONSE_DATA {
    message : MESSAGE_ROOM_DATA_ITEM[],
    total : number,
    page : number,
    limit : number
}

export interface MESSAGE_DATA_CLIENT_PARAMS {
    anotherId : string,
    cursor : string,
    offset : number,
    limit : number
}

export interface MESSAGE_MAP_DATA_VALUE {
    message : string,
    sendDate : string,
    sender : string
}

export interface MESSAGE_READ_API_PARAMS {
    reader : string,
    sender : string
}

export interface MESSAGE_READ_RESPONSE_DATA {
    acknowledged: boolean, /** 명령이 정상적으로 MongoDB에 전송되었는지 여부 */
    matchedCount: number, /** 조건에 일치한 문서 수 */
    modifiedCount: number, /** 실제로 수정된 문서 수 */
    upsertedCount: number, /** upsert 옵션을 사용했을 때 생성된 문서 수 */
    upsertedId: null, /** upsert로 생성된 문서의 _id  */
}

export type MESSAGE_MAP_DATA = [ string, MESSAGE_MAP_DATA_VALUE ]

export type MESSAGE_FORM_VALUE = SEND_MESSAGE;

export type MESSAGE_USER_RECIVER_RESPONSE = RESPONSE_MODEL<USER_RECIVER | null>

export type MESSAGE_ROOM_RESPONSE = RESPONSE_MODEL<MESSAGE_ROOM_RESPONSE_DATA[]>

export type MESSAGE_DATA_RESPONSE = RESPONSE_MODEL<MESSAGE_ITEMS_RESPONSE_DATA | null>

export type MESSAGE_READ_RESPONSE = RESPONSE_MODEL<MESSAGE_ROOM_RESPONSE_DATA[] | null>