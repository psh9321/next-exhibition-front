"use client"

import { Undo2 } from 'lucide-react';

import Link from 'next/link';

import { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form"
import { useRouter } from 'next/navigation'

import { InputLabelEmail, InputLabelPw, InputLabelEmailAuth, InputLabelName, InputLabelPhone, InputLabelBirth, InputLabelNickName } from "@/component/form/InputLabel"
import SelectBox from '@/component/form/SelectBox';
import { GenderCheckBox, PersonalCheckBox, /** ReceiveEmailCheckBox */ } from '@/component/form/CheckBoxLabel';
import { ErrorMsg } from "@/component/shared/Message"

import RegisterNav from '@/component/account/RegisterNav';

import { useLoadingView } from "@/hook/useLoadingView"
import { useToastHook } from "@/hook/useToast"

import { email_regex, pw_regex, name_regex, birth_regex } from "@/util/regex"
import { area } from '@/util/opts';

import { API_SEND_EMAIL_AUTH, API_PHONE_CHECK, API_REGISTER_SUBMIT } from '@/api/account.client';

import accountStyles from "@/styles/account.module.css"

import { REGISTER_FORM_VALUE } from "@/types/account/register"


const RegisterPageView = () => {

    const router = useRouter();

    const methods = useForm<REGISTER_FORM_VALUE>();

    const [emailAuth, setEmailAuth] = useState<string>("");

    const [currentIdx, setCurrentIdx] = useState<number>(0);

    const [infoChapterMsg, setInfoChapterMsg] = useState<string>("");

    const { RegisterToast, setToastState } = useToastHook();

    const { ShowLoadingView, HideLoadingView, LoadingElement } = useLoadingView();

    /** 인증 메일 받기 */
    function SendAuth(){

        if(methods.getValues("isSendAuth")) return;

        const email = methods.getValues("registerEmail");

        if(!email) return methods.setError("registerEmail",{message : "이메일을 입력해주세요."});
        if(!email_regex.test(email)) return methods.setError("registerEmail",{message : "이메일 형식을 확인 해주세요."});

        ShowLoadingView();

        if(methods.formState.errors?.registerEmail) methods.clearErrors("registerEmail");

        API_SEND_EMAIL_AUTH(email)
        .then(rs => {
            HideLoadingView();
            
            if(rs["resultCode"] !== 200) return setToastState("이미 가입된 아이디(이메일)");

            setEmailAuth(rs["data"] as string)
            methods.setValue("isSendAuth", true);
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("resiger page.tsx email send err",err)
        })
        
    }

    function EmailSubmit(){ 
        if(!emailAuth) return 

        const sendValue = methods.getValues("registerEmailAuth");

        if(!sendValue|| sendValue.length < 6) return methods.setError("registerEmailAuth", {message : "인증 번호를 확인해주세요."});

        if(emailAuth !== sendValue) return methods.setError("registerEmailAuth", {message : "인증번호를 다시 확인 해주세요."})

        if(methods.formState.errors?.registerEmailAuth) methods.clearErrors("registerEmailAuth");

        setCurrentIdx(1);
    }

    function PhoneSubmit() {
        const { registerPhone, registerPhoneAgency } = methods.watch();
        
        if(!registerPhone) {
            if(methods.formState.errors?.registerPhoneAgency) methods.clearErrors("registerPhoneAgency")
            return methods.setError("registerPhone", {message : "폰번호를 입력해주세요."});
        }

        if(!registerPhoneAgency) {
            if(methods.formState.errors?.registerPhone) methods.clearErrors("registerPhone");
            return methods.setError("registerPhoneAgency", {message : "통신사를 선택해주세요."})
        }

        if(methods.formState.errors.registerPhoneAgency) methods.clearErrors("registerPhoneAgency");

        ShowLoadingView();

        API_PHONE_CHECK({ registerPhone, registerPhoneAgency })
        .then(rs => {

            HideLoadingView();

            if(rs !== 200) return setToastState("이미 가입된 폰번호");

            setCurrentIdx(2);
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("resiger page.tsx phone check err",err)
        })
    }

    /** 비밀번호 챕터 submit */
    function PassWordSubmit() {
        const pw = methods.getValues("registerPw");

        if(!pw) return methods.setError("registerPw", {message : "비밀번호를 입력해주세요."});
        if(!pw_regex.test(pw)) return methods.setError("registerPw", {message : "영문, 숫자로 6자 이상, 15자 이하로 입력해주세요."});

        const pwCheck = methods.getValues("registerPwCheck");

        if(pw !== pwCheck) return methods.setError("registerPwCheck",{ message : "비밀번호를 확인 해주세요." });

        setCurrentIdx(3);
    }

    /** 이름, 생년월일, 성별, 개인정보 동의 submit */
    function RegisterSubmit() {

        const {  registerEmail, registerPhone, registerPw ,registerName, registerBirth, registerGender, registerPersonalInfo, registerArea } = methods.watch();

        if(!registerName) return setInfoChapterMsg("이름을 입력해주세요.");
        if(!name_regex.test(registerName)) return setInfoChapterMsg("이름을 확인 해주세요.");
        if(!registerBirth) return setInfoChapterMsg("생년월일 을 입력해주세요.");
        if(!birth_regex.test(registerBirth)) return setInfoChapterMsg("생년월일 을 확인 해주세요.");
        if(!registerArea) return setInfoChapterMsg("현재 거주지를 설정해주세요.")
        if(registerGender === undefined) return setInfoChapterMsg("성별을 선택 해주세요.");
        if(!registerPersonalInfo) return setInfoChapterMsg("'개인정보 수집 동의' 에 체크 해주세요.");

        if(!registerEmail) {
            setCurrentIdx(0)
            methods.setError("registerEmail",{message : "이메일을 입력해주세요."});

            return
        }

        if(!registerPhone) {
            setCurrentIdx(1)
            methods.setError("registerPhone",{message : "폰번호를 입력해주세요."});

            return
        }

        if(!registerPw) {
            setCurrentIdx(2)
            methods.setError("registerPw",{message : "비밀번호를 입력해주세요."});

            return
        }

        ShowLoadingView();

        API_REGISTER_SUBMIT(methods.watch())
        .then(rs => {

            HideLoadingView();
            
            setToastState(`회원가입 ${rs === 200 ? "성공" : "실패"}`);

        }).catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("resiger page.tsx register err",err)
        })
        
    }
    
    function NaviCallback(){ router.replace("/account/login") }

    function PreventDefaultForm(e : React.KeyboardEvent<HTMLFormElement>) { e.preventDefault() };

    return (
        <>
            <RegisterToast registerCompleteCallback={NaviCallback}/>

            <FormProvider {...methods}>
                <h2 className="hidden">회원가입</h2>
                <Link className={accountStyles.btnBack} href={"/account/login"} title="뒤로가기">
                    <Undo2/>
                </Link>
                <form onSubmit={PreventDefaultForm} className={accountStyles.register}>
                    <h3 className={accountStyles.logo}>회원가입</h3>

                    <LoadingElement/>

                    <div className={accountStyles.registerSlideWrapper} style={{left : `-${currentIdx*100}%`}}>
                        <div className={`${accountStyles.registerSlide} ${accountStyles.email}`}>
                            <ul className={accountStyles.inputList}>
                                <li>
                                    <InputLabelEmail isReadDisabled={methods.getValues("isSendAuth")} labelName='아이디로 사용할 이메일을 입력해주세요.' id='registerEmail'>
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.registerEmail?.message} />
                                    </InputLabelEmail>
                                </li>
                                { 
                                    methods.getValues("isSendAuth") && 
                                    <li>
                                        <InputLabelEmailAuth labelName='이메일로 받은 인증번호를 입력해주세요.' id='registerEmailAuth'>
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.registerEmailAuth?.message} />
                                        </InputLabelEmailAuth>
                                    </li>
                                }
                            </ul>
                            <ul className={accountStyles.btnList}>
                                {
                                    methods.getValues("isSendAuth") &&
                                    <li>
                                        <button type='button' className={accountStyles.btnAuth} onClick={EmailSubmit}>이메일 인증</button>
                                    </li> 
                                }
                                
                                <li>
                                    <button type='button' className={methods.getValues("isSendAuth") ? accountStyles.disable : ""} onClick={SendAuth}>인증 메일 받기</button>
                                </li>
                            </ul>
                        </div>
                        <div className={`${accountStyles.registerSlide} ${accountStyles.phone}`}>
                            <ul className={accountStyles.inputList}>
                                <li>
                                    <SelectBox 
                                        className={accountStyles.selectBox} 
                                        defaultSelectValue='통신사' 
                                        id='registerPhoneAgency' 
                                        options={["SKT", "KT", "LG+U"]} 
                                    />
                                    <InputLabelPhone labelName='가입할 폰번호를 입력해주세요' id='registerPhone'/>
                                    <ErrorMsg 
                                        _className={accountStyles.errorMsg} 
                                        txt={methods.formState.errors?.registerPhone?.message} 
                                    />
                                    <ErrorMsg 
                                        _className={accountStyles.errorMsg} 
                                        txt={methods.formState.errors?.registerPhoneAgency?.message} 
                                    />
                                </li>
                            </ul>
                            <ul className={accountStyles.btnList}>
                                <li>
                                    <button type='button' onClick={PhoneSubmit}>폰번호 확인</button>
                                </li>
                            </ul>
                        </div>
                        <div className={`${accountStyles.registerSlide} ${accountStyles.pw}`}>
                            <ul className={accountStyles.inputList}>
                                <li>
                                    <InputLabelPw 
                                        id='registerPw' 
                                        labelName='비밀번호를 입력해주세요.' 
                                        toggleBtnClassName={accountStyles.toggleBox}>
                                        
                                        <ErrorMsg 
                                            _className={accountStyles.errorMsg} 
                                            txt={methods.formState.errors?.registerPw?.message} 
                                        />
                                    </InputLabelPw>
                                </li>
                                <li>
                                    <InputLabelPw 
                                        id='registerPwCheck' 
                                        labelName='비밀번호를 한번더 입력해주세요.' 
                                        toggleBtnClassName={accountStyles.toggleBox}>

                                        <ErrorMsg 
                                            _className={accountStyles.errorMsg} 
                                            txt={methods.formState.errors?.registerPwCheck?.message} 
                                        />
                                    </InputLabelPw>
                                </li>
                            </ul>
                            <ul className={accountStyles.btnList}>
                                <li>
                                    <button type='button' onClick={PassWordSubmit}>다음</button>
                                </li>
                            </ul>
                        </div>
                        <div className={`${accountStyles.registerSlide} ${accountStyles.info}`}>
                            <ul className={accountStyles.inputList}>
                                <li className={accountStyles.name}>
                                    <InputLabelName id='registerName' labelName='이름' />
                                </li>
                                <li className={accountStyles.nickName}>
                                    <InputLabelNickName id='registerNickName' labelName='닉네임' />
                                </li>
                                <li className={accountStyles.birth}>
                                    <InputLabelBirth id='registerBirth' labelName='생년월일' />
                                </li>
                                <li className={accountStyles.area}>
                                    <SelectBox className={accountStyles.selectBox} 
                                        defaultSelectValue='현재 거주지' 
                                        id='registerArea' 
                                        options={area} 
                                        selectListClassName={accountStyles.selectList}
                                        />
                                        
                                </li>
                                <li className={accountStyles.gender}>
                                    <GenderCheckBox 
                                        id='registerGender' 
                                        className={accountStyles.checkBox} 
                                        defaultValue={methods.getValues("registerGender")}
                                        activeClassName={accountStyles.active} 
                                    />
                                </li>
                                <li className={accountStyles.checkList}>
                                    <ul className={accountStyles.checkBoxList}>
                                        <li>
                                            <PersonalCheckBox id='registerPersonalInfo' activeClassName={accountStyles.active} />
                                        </li>
                                        {/* <li>
                                            <ReceiveEmailCheckBox id='registerReceiveEmail' activeClassName={accountStyles.active}/>
                                        </li> */}
                                    </ul>

                                    <ErrorMsg 
                                        _className={accountStyles.errorMsg} 
                                        txt={infoChapterMsg} 
                                    />
                                </li>
                            </ul>
                            <div className={accountStyles.submitBox}>
                                <button type='button' onClick={RegisterSubmit}>회원가입 하기</button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
            <RegisterNav currentIdx={currentIdx}/>
        </>
    )
}

export default RegisterPageView