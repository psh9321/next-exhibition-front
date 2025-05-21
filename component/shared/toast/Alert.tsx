import { CircleX, CircleCheckBig, Trash2, Notebook } from 'lucide-react';

import Portal from "../Portal";
import { ALERT_INTER_FACE, ONLY_CANCEL_CALLBACK } from "@/types/toast"

import toastStyles from "@/styles/toast.module.css"
import { useThemeStore } from '@/store/useThemeStore';

const Alert = ({
    title,
    titleIcon = <CircleX/>,
    contents,
    btnCancelTxt = "확인",
    cancelCallback
} : ALERT_INTER_FACE) => {

    const { theme } = useThemeStore();
    
    return (
        <Portal>
            <div id={toastStyles.toast} className={toastStyles[theme]}>
                <div className={toastStyles.inner}>
                    <dl>        
                        <dt>
                            {titleIcon??null}
                            {title as string}
                        </dt>
                        {
                            <dd dangerouslySetInnerHTML={{__html:contents}}></dd>
                        }
                    </dl>
                    <ul className={toastStyles.btnList}>
                        <li><button onClick={cancelCallback}>{btnCancelTxt}</button></li>
                    </ul>
                </div>
            </div>
        </Portal>
    )
}

/** 로그인 실패 */
export const AlertLoginFail = ( {cancelCallback} :ONLY_CANCEL_CALLBACK ) => {
    return (
        <Alert  
            title={"로그인 실패"}
            contents={"입력하신 아이디, 비밀번호를<br/>확인 해주세요."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertIdSearchFail = ( {cancelCallback} : ONLY_CANCEL_CALLBACK ) => {
    return (
        <Alert  
            title={"아이디 찾기 실패"}
            contents={"조회된 정보가 없습니다."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertPwSearchFail = ( {cancelCallback} : ONLY_CANCEL_CALLBACK ) => {
    return (
        <Alert  
            title={"비밀번호 찾기 실패"}
            contents={"조회된 정보가 없습니다."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertPwSearchSuccess = ( {cancelCallback} : ONLY_CANCEL_CALLBACK ) => {
    return (
        <Alert  
            title={"유저 조회 성공"}
            titleIcon={<CircleCheckBig/>}
            contents={"새 비밀번호를 입력해주세요."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertPwChangeSuccess = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {

    return (
        <Portal>
            <Alert  
                title={"비밀번호 변경 성공"}
                titleIcon={<CircleCheckBig/>}
                contents={"새 비밀번호로 로그인 해주세요."} 
                cancelCallback={cancelCallback} 
            />
        </Portal>
    )
}

export const AlertPwChangeFail = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Portal>
            <Alert  
                title={"비밀번호 변경 실패"}
                contents={"기존의 비밀번호와 <br/> 다르게 입력해주세요."} 
                cancelCallback={cancelCallback} 
            />
        </Portal>
    )
}

export const AlertEmailAuthFail = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Portal>
            <Alert  
                title={"인증 메일 발송 실패"}
                contents={"인증 메일 발송에 실패 했습니다.<br/>잠시후 다시 시도해주세요."} 
                cancelCallback={cancelCallback} 
            />
        </Portal>
    )
}

export const AlertRegisterEmailFail = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert  
            title={"이메일 인증 실패"}
            contents={"이미 가입된 이메일 입니다."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertRegisterPhoneFail = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert  
            title={"휴대폰 인증 실패"}
            contents={"이미 가입된 폰번호 입니다."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertRegisterFail = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert  
            title={"회원가입 실패"}
            contents={"회원가입에 실패 했습니다."} 
            cancelCallback={cancelCallback} 
        />    
    )
}

export const AlertRegisterComplete = ({cancelCallback} : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert  
            titleIcon={<CircleCheckBig/>}
            title={"회원가입 성공"}
            contents={"가입된 계정으로 로그인해주세요."} 
            cancelCallback={cancelCallback} 
        />
    )
}

interface WRITE_ALERT_INTER_FACE extends ONLY_CANCEL_CALLBACK {
    title : string,    
}

export const AlertWriteAddComplete = ({cancelCallback, title} : WRITE_ALERT_INTER_FACE) => {
    return (
        <Alert  
            titleIcon={<CircleCheckBig/>}
            title={title}
            contents={`게시물이 등록 됐습니다.`} 
            cancelCallback={cancelCallback} 
        />
    )
}

export const AlertTargetWriteLength = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert  
            titleIcon={<CircleCheckBig/>}
            title={"삭제 실패"}
            contents={`삭제할 게시물을 선택 해주세요.`} 
            cancelCallback={cancelCallback} 
        />
    )
}

export const AlertDeleteTarget = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert
            title={"삭제 성공"}
            titleIcon={<Trash2/>}
            contents={"선택한 데이터가 삭제 되었습니다."}
            cancelCallback={cancelCallback} 
        />
    )
}

export const AlertNickNameLength = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert
            title={""}
            titleIcon={null}
            contents={"닉네임은 최소 2자 이상 <br/> 단어로 입력해주세요."}
            cancelCallback={cancelCallback} 
        />
    )
}

export const AlertNickNameRegular = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert
            title={""}
            titleIcon={null}
            contents={"닉네임에 초성, 특수문자는 <br/> 입력 할수 없습니다."}
            cancelCallback={cancelCallback} 
        />
    )
}

/** 토큰 만료 */
export const AlertAuthFail = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert 
            title={"로그인 만료"}
            titleIcon={null}
            contents={"다시 로그인 후 시도 해주세요."} 
            cancelCallback={cancelCallback} 
        />
    )
}

/** 모임 등록 성공 */
export const AlertAddMeetingComplete = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert 
            title={"모임생성 성공"}
            titleIcon={<Notebook/>}
            contents={"성공적으로 모임을 생성 했습니다."} 
            cancelCallback={cancelCallback} 
        />
    )
}

interface TARGET_MEETING_DELETE_COMPLETE extends ONLY_CANCEL_CALLBACK {
    title : string
}

/** 해당 모임 삭제 성공 */
export const AlertTargetMeetingDeleteComplete = ({ cancelCallback, title } : TARGET_MEETING_DELETE_COMPLETE) => {
    return (
        <Alert 
            title={"모임 삭제 성공"}
            titleIcon={<Trash2/>}
            contents={`"${title}" <br/> 모임을 삭제 했습니다.`} 
            cancelCallback={cancelCallback} 
        />
    )
}

/** 해당 모임 삭제 성공 */
export const AlertMeetingUpdateComplete = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert 
            title={"모임 수정 성공"}
            titleIcon={null}
            contents={`성공적으로 수정 했습니다.`} 
            cancelCallback={cancelCallback} 
        />
    )
}

/** 해당 모임 정원 초과 */
export const AlertMeetingMemberExceed = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert 
            title={"정원 초과"}
            titleIcon={<CircleX/>}
            contents={`더이상 참석 할수 없습니다.`} 
            cancelCallback={cancelCallback} 
        />
    )
}

/** 서비스 에러 */
export const AlertServiceError = ({ cancelCallback } : ONLY_CANCEL_CALLBACK) => {
    return (
        <Alert 
            title={"서비스 에러"}
            contents={"서비스가 원활 하지 않습니다."} 
            cancelCallback={cancelCallback} 
        />
    )
    
}