import { CircleHelp, Trash2 } from 'lucide-react';

import Portal from "../Portal";

import { useThemeStore } from '@/store/useThemeStore';

import { CONFIRM_INTER_FACE, CONFIRM_CALLBACK_INTER_FACE } from "@/types/toast"

import toastStyles from "@/styles/toast.module.css"

export const Confirm = ({
    title,
    titleIcon = <CircleHelp/>,
    contents,
    btnCancelTxt = "취소",
    btnSubmitTxt = "확인",
    cancelCallback,
    submitCallback
} : CONFIRM_INTER_FACE) => {

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
                        <dd dangerouslySetInnerHTML={{__html:contents}}></dd>
                    </dl>
                    <ul className={toastStyles.btnList}>
                        <li><button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            cancelCallback();
                        }}>{btnCancelTxt}</button></li>
                        <li><button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            submitCallback();
                        }}>{btnSubmitTxt}</button></li>
                    </ul>
                </div>
            </div>
        </Portal>
    )
}

export const ConfirmLogout = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"로그아웃"}
            contents='로그아웃 하시겠습니까?'
            btnSubmitTxt='로그아웃'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmCancelAdd = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"자기소개 등록 취소"}
            contents='작성 중인 내용은 저장 되지 않습니다.<br/> 목록으로 돌아가시겠습니까?'
            btnSubmitTxt='목록으로'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmContentsDelete = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"선택한 게시물 삭제"}
            contents='삭제된 게시물은 복구 되지않습니다.<br/> 삭제하시겠습니까?'
            btnSubmitTxt='삭제'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmRecentAllDelete = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={""}
            titleIcon={false}
            contents='최근 검색어를 <br/> 모두 삭제하시겠습니까?'
            btnSubmitTxt='삭제'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmSearchResultReset = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"검색 초기화"}
            contents='검색 내용을 초기화 하고 <br/> 목록으로 돌아가시겠습니까?'
            btnSubmitTxt='초기화'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmLoginRecommendation = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"로그인 후 이용가능"}
            titleIcon={false}
            contents='로그인 후 이용 해주세요.'
            btnSubmitTxt='로그인'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmResetProfileImg = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"프로필 이미지 삭제"}
            contents='삭제된 프로필 이미지는 복구되지않습니다.<br/> 삭제 하시겠습니까?'
            btnSubmitTxt='삭제'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

interface CONFIRM_DELETE_MEETING extends CONFIRM_CALLBACK_INTER_FACE {
    title : string,
}

export const ConfirmDeleteMeeting = ({ cancelCallback, submitCallback, title } : CONFIRM_DELETE_MEETING) => {
    return (
        <Confirm 
            title={"모임 삭제"}
            titleIcon={<Trash2/>}
            contents={`"${title}" <br/> 삭제된 모임은 복구되지않습니다.<br/> 삭제 하시겠습니까?`}
            btnSubmitTxt='삭제'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmUnUpdateMeeting = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={"등록/수정 취소"}
            titleIcon={<Trash2/>}
            contents={`등록/수정 중인 내용은 저장되지않습니다. <br/> 목록으로 이동하시겠습니까?`}
            btnSubmitTxt='이동'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmMeetingAttend = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={""}
            titleIcon={null}
            contents={`모임에 참석 하시겠습니까?`}
            btnSubmitTxt='참석'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmMeetingCancel = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={""}
            titleIcon={null}
            contents={`모임 참석을 취소 하시겠습니까?`}
            btnSubmitTxt='참석 취소'
            btnCancelTxt='닫기'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}

export const ConfirmMeetingUpdate = ({ cancelCallback, submitCallback } : CONFIRM_CALLBACK_INTER_FACE) => {
    return (
        <Confirm 
            title={``}
            titleIcon={false}
            contents={`해당 모임을 수정 하시겠습니까?`}
            btnSubmitTxt='수정'
            submitCallback={submitCallback}
            cancelCallback={cancelCallback}

        />   
    )
}