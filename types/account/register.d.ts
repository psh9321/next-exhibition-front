import { RESPONSE_MODEL } from "../response"

export interface REGISTER_FORM_VALUE {
    registerEmail : string /** 이메일 */
    registerEmailAuth : string, /** 인증 값 (백엔드와 통신하지않는 데이터) */    
    isSendAuth : boolean /** 인증메일을 받았는지 여부 (백엔드와 통신하지않는 데이터) */
    isAuth : boolean /** 인증 여부 (백엔드와 통신하지않는 데이터) */

    registerPhoneAgency : "SKT" | "KT" | "LG+U" | "", /** 통신사 skt, kt, lg */
    registerPhone : string /** 폰번호 */

    registerPw : string, /** 비밀번호 */
    registerPwCheck : string, /** 비밀번호 확인 */

    registerName : string, /** 이름 */
    registerGender : number, /** 성별. 0 : 남, 1 : 여 */
    registerBirth : string, /** 생년월일 ex) 19940711 */

    registerPersonalInfo : boolean /** 개인정보수집 동의 */
    registerReceiveEmail? : boolean /** 이메일 알림 수신 동의 */

    registerNickName? : string, /** 닉네임 */ 

    registerArea : string, /** 현재 거주지 */
}

export interface REGISTER_PHONE_CHECK {
    registerPhone : string,
    registerPhoneAgency : "SKT" | "KT" | "LG+U" | ""
}

export interface REGISTER_BACK_END_PARAMS {
    id,
    pw,
    name,
    birth,
    phone,
    phoneAgency,
    gender,
    nickName,
    area
}

export type EMAIL_SEND_RESPONSE = RESPONSE_MODEL<string | null>;

export type REGISTER_API_RESPONSE = RESPONSE_MODEL<null | string>;