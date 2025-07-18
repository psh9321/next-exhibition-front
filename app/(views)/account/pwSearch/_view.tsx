"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from "next/navigation"

import { InputLabelName, InputLabelEmail, InputLabelPhone, InputLabelPw } from "@/component/form/InputLabel"
import { ErrorMsg } from "@/component/shared/Message"
import { BtnNaviHome } from "@/component/account/BtnHome"

import { useLoadingView } from "@/hook/useLoadingView"
import { useToastHook } from "@/hook/useToast"

import accountStyles from "@/styles/account/account.module.css"

import { API_ACCOUNT_PW_CHANGE, API_ACCOUNT_PW_SEARCH } from "@/api/account.client"

import { PW_SEARCH_FORM_VALUE, PW_CHANGE_FORM_VALUE } from "@/types/account/pw.search.change"

const PwSearchPageView = () => {

    const router = useRouter();

    const pwSearchMethods = useForm<PW_SEARCH_FORM_VALUE>();

    const pwChangeMethods = useForm<PW_CHANGE_FORM_VALUE>();

    const [isPwSuccess, setIsPwSuccess] = useState<boolean>(false);

    const { PwSearchToast, setToastState } = useToastHook();

    const { ShowLoadingView, HideLoadingView, LoadingElement } = useLoadingView();

    function OnSubmitPwChange(data : PW_CHANGE_FORM_VALUE){
        ShowLoadingView();
        
        const params = {...data, ...pwSearchMethods.watch()};

        API_ACCOUNT_PW_CHANGE(params)
        .then(rs => {
            HideLoadingView();
            setToastState(`비밀번호 변경 ${rs ? "성공" : "실패"}`);
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("pwsearch page.ts pwchange error", err)
        })
    }

    function OnSubmitPwSearch(data : PW_SEARCH_FORM_VALUE){

        ShowLoadingView();

        API_ACCOUNT_PW_SEARCH(data)
        .then(rs => {
            HideLoadingView();
            setToastState(rs ? "유저 조회 성공" : "비밀번호 찾기 실패");
            setIsPwSuccess(rs);
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("pwsearch page.ts pwsearch error", err)
        })
    }

    function NaviCallback(){ router.replace("/account/login") }

    return (
        <>
            <BtnNaviHome className={accountStyles.btnNaviHome}/>
            
            <PwSearchToast pwChangeCompleteCallback={NaviCallback}/>

            <div className={accountStyles.pwSearch}>
                <h3 className={accountStyles.logo}>{isPwSuccess ? "새 비밀번호 입력" : "비밀번호 찾기"}</h3>
                {
                    isPwSuccess ? 
                    <FormProvider {...pwChangeMethods}>
                        <form className={accountStyles.pwChangeForm} onSubmit={pwChangeMethods["handleSubmit"](OnSubmitPwChange)}>

                            <LoadingElement/>

                            <ul className={accountStyles.inputList}>
                                <li>
                                    <InputLabelPw toggleBtnClassName={accountStyles.toggleBox} labelName="비밀번호" id="changePw">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={pwChangeMethods["formState"]["errors"]?.changePw?.message} />
                                    </InputLabelPw>
                                </li>
                                <li>
                                    <InputLabelPw toggleBtnClassName={accountStyles.toggleBox} labelName="비밀번호 확인" id="changePwCheck">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={pwChangeMethods["formState"]["errors"]?.changePwCheck?.message} />
                                    </InputLabelPw>
                                </li>
                            </ul>
                            <div className={accountStyles.submitBox}>
                                <button type="submit">비밀번호 변경</button>
                            </div>
                        </form>
                    </FormProvider>
                    :
                    <FormProvider {...pwSearchMethods}>
                        <form onSubmit={pwSearchMethods["handleSubmit"](OnSubmitPwSearch)}>

                            <LoadingElement/>

                            <ul className={accountStyles.inputList}>
                                <li>
                                    <InputLabelName labelName="이름" id="searchName">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={pwSearchMethods["formState"]["errors"]?.searchName?.message}/>
                                    </InputLabelName>
                                </li>
                                <li>
                                    <InputLabelEmail labelName="아이디" id="searchId">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={pwSearchMethods["formState"]["errors"]?.searchId?.message}/>
                                    </InputLabelEmail>
                                </li>
                                <li>
                                    <InputLabelPhone labelName="폰번호" id="searchPhone">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={pwSearchMethods["formState"]["errors"]?.searchPhone?.message}/>
                                    </InputLabelPhone>
                                </li>
                            </ul>
                            <div className={accountStyles.submitBox}>
                                <button type="submit">비밀번호 찾기</button>
                            </div>
                        </form>
                    </FormProvider>
                }
            </div>
        </>
    )
}

export default PwSearchPageView