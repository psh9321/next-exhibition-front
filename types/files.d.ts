import { RESPONSE_MODEL } from "./response"

export interface FILE_UPLOAD_RESPONSE_SUCCESS_DATA {
    id : string, /** 유저 아이디 */
    fileName : string, /** 변환된 파일 이름 */
    originName : string, /** 파일 원본 이름 */
    type : string, /** 파일 타입 */
}

export type FILE_UPLOAD_RESPONSE = RESPONSE_MODEL<FILE_UPLOAD_RESPONSE_SUCCESS_DATA[] | null | string>