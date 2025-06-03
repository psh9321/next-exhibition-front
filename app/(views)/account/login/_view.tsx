"use client"

import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"

import { InputLabelEmail, InputLabelPw } from "@/component/form/InputLabel"
import { ErrorMsg } from "@/component/shared/Message"
import { BtnNaviHome } from "@/component/account/BtnHome"

import accountStyles from "@/styles/account.module.css"

import { useLoadingView } from "@/hook/useLoadingView"
import { useToastHook } from "@/hook/useToast"
import { useFavoriteMutation, useUserInfoMutation, useMeetingMutation, useMessageMutation } from "@/hook/useMutation"

import { API_ACCOUNT_LOGIN } from "@/api/account.client"

import { LOGIN_FORM_VALUE } from "@/types/account/login"

const LoginPage = () => {

    const router = useRouter();

    const methods = useForm<LOGIN_FORM_VALUE>();

    const { LoginToast, setToastState } = useToastHook();

    const { ShowLoadingView, HideLoadingView, LoadingElement } = useLoadingView();

    const { InitUserInfo } = useUserInfoMutation();
    const { InitFavorite } = useFavoriteMutation();
    const { InitPromise } = useMeetingMutation();
    const { InitMessage } = useMessageMutation();

    const { mutateAsync : SetUpUserInfo } = InitUserInfo();
    const { mutateAsync : SetupFavorite } = InitFavorite();
    const { mutateAsync : SetupPromise } = InitPromise();
    const { mutateAsync : SetupMessage } = InitMessage();

    function OnSubmit(data : LOGIN_FORM_VALUE){

        ShowLoadingView();

        API_ACCOUNT_LOGIN(data)
        .then(async (rs) => {
            
            if(rs !== 200) {
                HideLoadingView();
                return setToastState("로그인 실패");
            }

            await SetUpUserInfo();
            await SetupFavorite();
            await SetupPromise();
            await SetupMessage();
            
            HideLoadingView();
            router.replace("/");  
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("login page.ts login error", err)
        })
    }

    return (
        <>
            <LoginToast/>

            <BtnNaviHome className={accountStyles.btnNaviHome}/>
            
            <h2 className="hidden">로그인</h2>
            <div className={accountStyles.login}>

                <h3 className={accountStyles.logo}>
                    전시 + 緣 <br />
                    <span>{`(전시와 사람 사이의 '인연')`}</span>
                </h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods["handleSubmit"](OnSubmit)}>

                        <LoadingElement/>

                        <ul className={accountStyles.inputList}>
                            <li>
                                <InputLabelEmail labelName="아이디" id="loginId" placeholder="가입한 이메일을 입력해주세요.">
                                    <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.loginId?.message} /> 
                                </InputLabelEmail>
                            </li>
                            <li>
                                <InputLabelPw toggleBtnClassName={accountStyles.toggleBox} labelName="비밀번호" id="loginPw" >
                                    <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.loginPw?.message} />  
                                </InputLabelPw>
                            </li>
                        </ul>
                        <div className={accountStyles.submitBox}>
                            <button type="submit">로그인</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default LoginPage