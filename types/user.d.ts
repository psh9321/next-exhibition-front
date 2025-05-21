import { RESPONSE_MODEL } from "./response";

export interface USER_INFO {
    id: string, /** 유저 아이디 */
    name: string, /** 유저 이름 */
    nickName: string, /** 유저 닉네임 */
    phone: string, /** 유저 폰번호 */
    birth: string, /** 유저 생일 */
    gender: number, /** 유저 성별 0 : 남, 1 : 여 */
    createDate: string, /** 가입 일자 */
    profileImg: string, /** 프로필 이미지 파일 이름 */
    area : string, /** 유저 거주 지역 */
    key : string, /** mongoDB objectId */
}

export interface USER_INFO_PATCH {
    nickName: string, /** 유저 닉네임 */
    profileImg?: string, /** 프로필 이미지 파일 이름 */
    area : string, /** 유저 거주 지역 */
}

export interface USER_FORM_VALUE {
    userArea : string,
    userNickName? : string,
    userImg? : string,
}

export type GET_USER_RESPONSE = RESPONSE_MODEL<USER_INFO | null>;