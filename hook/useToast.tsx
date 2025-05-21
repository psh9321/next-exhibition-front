"use client"

import { useState } from "react"

import { 
    AlertLoginFail, 
    AlertIdSearchFail,
    AlertPwSearchFail,
    AlertPwSearchSuccess,
    AlertPwChangeSuccess,
    AlertPwChangeFail,
    AlertEmailAuthFail,
    AlertRegisterEmailFail,
    AlertRegisterPhoneFail,
    AlertRegisterFail,
    AlertRegisterComplete,
    AlertNickNameLength,
    AlertNickNameRegular,
    AlertAuthFail,
    AlertAddMeetingComplete,
    AlertTargetMeetingDeleteComplete,
    AlertMeetingUpdateComplete,
    AlertMeetingMemberExceed,
    AlertServiceError 
} from "../component/shared/toast/Alert";

import { 
    ConfirmLogout,
    ConfirmRecentAllDelete,
    ConfirmSearchResultReset,
    ConfirmLoginRecommendation,
    ConfirmResetProfileImg,
    ConfirmDeleteMeeting,
    ConfirmUnUpdateMeeting,
    ConfirmMeetingAttend,
    ConfirmMeetingCancel,
    ConfirmMeetingUpdate,
} from "../component/shared/toast/Confirm";

interface COMMON_INTERFACE {
    [key : string] : () => void,
    
}

export const useToastHook = () => {
    const [isToast, setIsToast] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    /** 토스트 alert 창 상태 변경 */
    function setToastState(state : string, _title? : string) : void {
        if(_title) setTitle(_title);
        setIsToast(state);
    }

    /** alert 창 닫기 */
    function HiddenToast() { 
        if(title) setTitle("");
        setIsToast("");
    };

    /** 로그인 */
    const LoginToast = () => {
        switch (isToast) {
            case "로그인 실패": return <AlertLoginFail cancelCallback={HiddenToast}/>
            case "서비스 에러": return <AlertServiceError cancelCallback={HiddenToast}/>
        
            default: return <></>;
        }
    }

    /** 아이디 찾기 */
    const IdSearchToast = () => {
        switch (isToast) {
            case "아이디 찾기 실패": return <AlertIdSearchFail cancelCallback={HiddenToast}/>
            case "서비스 에러": return <AlertServiceError cancelCallback={HiddenToast}/>
        
            default: return <></>;
        }
    }

    /** 비밀번호 찾기 */
    const PwSearchToast = ({ pwChangeCompleteCallback } : {pwChangeCompleteCallback : () => void}) => {
        switch (isToast) {
            case "비밀번호 찾기 실패" : return <AlertPwSearchFail cancelCallback={HiddenToast}/>
            case "유저 조회 성공" : return <AlertPwSearchSuccess cancelCallback={HiddenToast}/>
            case "비밀번호 변경 성공" : return <AlertPwChangeSuccess cancelCallback={() => {
                HiddenToast();
                if(pwChangeCompleteCallback) pwChangeCompleteCallback();
            }}/>
            case "비밀번호 변경 실패" : return <AlertPwChangeFail cancelCallback={HiddenToast}/>
            case "서비스 에러": return <AlertServiceError cancelCallback={HiddenToast}/>
        
            default: return <></>;
        }
    }

    /** 회원가입 */
    const RegisterToast = ({ registerCompleteCallback } : {registerCompleteCallback : () => void}) => {
        switch (isToast) {

            case "인증 메일 발송 실패" : return <AlertEmailAuthFail cancelCallback={HiddenToast}/>
            case "이미 가입된 아이디(이메일)" : return <AlertRegisterEmailFail cancelCallback={HiddenToast}/>
            case "이미 가입된 폰번호" : return <AlertRegisterPhoneFail cancelCallback={HiddenToast}/>
            case "회원가입 실패" : return <AlertRegisterFail cancelCallback={HiddenToast}/>
            case "회원가입 성공" : return <AlertRegisterComplete cancelCallback={() => {
                HiddenToast();
                if(registerCompleteCallback) registerCompleteCallback()
            }}/>
            
            case "서비스 에러": return <AlertServiceError cancelCallback={HiddenToast}/>
        
            default: return <></>;
        }
    }

    interface MY_INFO_SETTING_TOAST {
        logoutCallback : () => void,
        resetProfileImgCallback : () => void,
    }

    const MyInfoSettingToast = ({ logoutCallback, resetProfileImgCallback } : MY_INFO_SETTING_TOAST ) => {
        switch (isToast) {
            case "로그아웃": return <ConfirmLogout cancelCallback={HiddenToast} submitCallback={() => {
                HiddenToast();
                if(logoutCallback)logoutCallback();
            }}/>

            case "프로필 이미지 삭제": return <ConfirmResetProfileImg cancelCallback={HiddenToast} submitCallback={() => {
                HiddenToast();
                if(resetProfileImgCallback)resetProfileImgCallback();
            }}/>

            case "닉네임 글자수 에러" : return <AlertNickNameLength cancelCallback={HiddenToast}/>

            case "닉네임 정규식 에러" : return <AlertNickNameRegular cancelCallback={HiddenToast}/>

            case "재 로그인" : return <AlertAuthFail cancelCallback={() => {
                HiddenToast();
            }}/>

            case "서비스 에러": return <AlertServiceError cancelCallback={HiddenToast}/>
        
            default: return <></>
                
        }
    }

    interface SEARCH_BOX {
        deleteCallback : () => void
    }

    const SearchBoxToast = ({ deleteCallback } : SEARCH_BOX) => {
        switch (isToast) {
            case "전체 키워드 삭제": return <ConfirmRecentAllDelete submitCallback={() => {
                deleteCallback();
                HiddenToast();
            }} cancelCallback={HiddenToast}/>
                
        
            default : return <></>
        }
    }

    interface SEARCH_RESULT {
        resetCallback : () => void
    }

    const SearchResultToast = ({resetCallback} : SEARCH_RESULT) => {
        switch (isToast) {
            case "검색 초기화": return <ConfirmSearchResultReset submitCallback={() => {
                resetCallback();
                HiddenToast();
            }} cancelCallback={HiddenToast}/>
                
        
            default : return <></>
        }
    }

    const BeforeLoginToast = ({naviToLoginCallback} : {naviToLoginCallback : () => void}) => {
        switch (isToast) {
            case "로그인 후 이용 가능": return <ConfirmLoginRecommendation submitCallback={() => {
                HiddenToast();
                naviToLoginCallback();
            }} cancelCallback={HiddenToast}/>
                
        
            default : return <></>
        }
    }

    const AddMeetingToast = ({ moveToIndexCallback, moveToMeetingCallback } : COMMON_INTERFACE) => {
        switch (isToast) {
            case "모임 등록 성공" : return <AlertAddMeetingComplete cancelCallback={() => {
                HiddenToast();
                if(moveToMeetingCallback) moveToMeetingCallback();
            }}/>
            case "재 로그인" : return <AlertAuthFail cancelCallback={() => {
                HiddenToast();
                if(moveToIndexCallback) moveToIndexCallback();
            }}/>
            case "수정 중 이동" : return <ConfirmUnUpdateMeeting submitCallback={() => {
                HiddenToast();
            }} cancelCallback={HiddenToast} />
        
            default: return <></>
        }
    }

    const DetailMeetingToast = ({ deleteCallback, moveToMeetingCallback, attendMeetingCallback, cancelMeetingCallback, updateMeetingCallback } : COMMON_INTERFACE) => {
        switch (isToast) {
            case "해당 모임 삭제": return <ConfirmDeleteMeeting title={title} submitCallback={async () => {
                HiddenToast();
                if(deleteCallback) deleteCallback();
            }} cancelCallback={HiddenToast}/>;

            case "해당 모임 삭제 성공" : return <AlertTargetMeetingDeleteComplete 
                title={title}
                cancelCallback={() => {
                    HiddenToast();
                    if(moveToMeetingCallback) moveToMeetingCallback();
                }}
            />
            
            case "모임 참석" : return <ConfirmMeetingAttend cancelCallback={HiddenToast} submitCallback={() => {
                HiddenToast();
                if(attendMeetingCallback) attendMeetingCallback();
            }} />

            case "모임 참석 취소" : return <ConfirmMeetingCancel cancelCallback={HiddenToast} submitCallback={() => {
                HiddenToast();
                if(cancelMeetingCallback) cancelMeetingCallback();
            }} />
            
            case "수정 중 이동" : return <ConfirmUnUpdateMeeting submitCallback={() => {
                HiddenToast();
            }} cancelCallback={HiddenToast} />

            case "모임 수정" : return <ConfirmMeetingUpdate submitCallback={() => {
                HiddenToast();
                if(updateMeetingCallback) updateMeetingCallback();
            }} cancelCallback={HiddenToast}/>

            case "수정 성공" : return <AlertMeetingUpdateComplete cancelCallback={HiddenToast} />

            case "모임 정원 초과" : return <AlertMeetingMemberExceed cancelCallback={HiddenToast} />
            
            default: return <></>
        }
    }

    return { 
        setToastState, 
        LoginToast, 
        IdSearchToast, 
        PwSearchToast, 
        RegisterToast,
        MyInfoSettingToast,
        SearchBoxToast,
        SearchResultToast,
        BeforeLoginToast,
        AddMeetingToast,
        DetailMeetingToast
    }
}