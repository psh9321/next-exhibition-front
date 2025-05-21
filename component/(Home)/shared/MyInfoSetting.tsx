"use client"

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form"

import { Mars, Venus, ImagePlus, Trash2, RefreshCw, SquareUserRound } from 'lucide-react';

import myInfoSettnigStyle from "@/styles/(home)/shared/myInfoSetting.module.css"

import SelectBox from "@/component/form/SelectBox";

import { useToastHook } from "@/hook/useToast";
import { useUserInfoMutation } from "@/hook/useMutation";
import useSocket from "@/hook/useSocket";
import { useUserInfoStore } from "@/store/useQueryStore";
import { useThemeStore } from "@/store/useThemeStore"

import { fileUrl, area } from "@/util/opts";
import { DateFormat } from "@/util/dateFormat";

import { API_LOGOUT } from "@/api/logout.client";
import { API_UPLOAD_PROFILE_IMG } from "@/api/files.client";

import { USER_FORM_VALUE } from "@/types/user";
import { FILE_UPLOAD_RESPONSE_SUCCESS_DATA } from "@/types/files"

interface MY_INFO_SETTING {
    CloseCallback : () => void
}



export const MyInfoSetting = ({ CloseCallback } : MY_INFO_SETTING) => {

    const router = useRouter();

    const pathname = usePathname();

    const queryClient = useQueryClient();

    const { userInfoQuery, UnSetQuery } = useUserInfoStore();

    const { theme } = useThemeStore();

    const { LogoutDisconnect } = useSocket();

    const inputFile = useRef<HTMLInputElement | null>(null);

    const method = useForm<USER_FORM_VALUE>({
        defaultValues : {
            userArea : userInfoQuery ? userInfoQuery["area"] : "",
            userNickName : userInfoQuery ? userInfoQuery["nickName"] : "",
            userImg : userInfoQuery ? userInfoQuery["profileImg"] : ""
        }
    });

    const { MyInfoSettingToast, setToastState } = useToastHook();

    const { UpdateUserInfo } = useUserInfoMutation();

    const { register, watch, setValue, getValues } = method;

    const [ profileSrc, setProfileSrc ] = useState<string>("");

    const [profileFormData, setProfileFormData] = useState<FormData | null>(null);

    const [ isProfileLayer, setIsProfileLayer ] = useState<boolean>(false);

    const { mutate : updateInfo } = UpdateUserInfo({
        successCallback() {
            CloseCallback();
        },
        failCallback(error) {
            console.log("mutation error",error)
            setToastState("서비스 에러");
        },
    })

    function PhoneComma(phone :string){
        const first = phone.substring(0,3);
        const middle = phone.substring(3,7);
        const last = phone.substring(7,11);

        return `${first}.${middle}.${last}`
    }

    function BirthComma(birth : string){
        const year = birth.substring(0,4);
        const month = birth.substring(4,6);
        const day = birth.substring(6,8);

        return `${year}.${month}.${day}`
    }

    async function OnSubmit(data : USER_FORM_VALUE){

        if(data["userNickName"]) {
            if(data["userNickName"].length < 2) return setToastState("닉네임 글자수 에러");

            if(!/^[가-힣]+([a-zA-Z0-9]+)?$/.test(data["userNickName"] as string)) return setToastState("닉네임 정규식 에러");
        }

        if(profileFormData) {
            const filesData = await API_UPLOAD_PROFILE_IMG(profileFormData) as FILE_UPLOAD_RESPONSE_SUCCESS_DATA | null;

            
            if(filesData) data["userImg"] = filesData["fileName"];
        }

        updateInfo(data);
    }

    function IsLogout(){ setToastState("로그아웃") };

    async function LogoutCallback() {
        const resultCode : number = await API_LOGOUT();

        if(resultCode !== 200) return setToastState("서비스 에러");

        CloseCallback();
        LogoutDisconnect(userInfoQuery?.["key"] as string);

        queryClient.removeQueries({queryKey : ["userInfo-query"]});
        queryClient.removeQueries({queryKey : ["favorite-query"]});
        queryClient.removeQueries({queryKey : ["meeting-query","promise"]});
        queryClient.removeQueries({queryKey : ["meeting-query","list"]});
        queryClient.removeQueries({queryKey : ["message-query"]});
        queryClient.removeQueries({queryKey : ["message-query","room"]});

        if(pathname.includes("favorite") || pathname.includes("meeting/add") || pathname.includes("meeting/my") || pathname.includes("message")) {
            router.replace("/");
        }
        else {
            // router.replace("/")
            router.refresh();
        }

        UnSetQuery()
    }

    function ProfileInputOnChange(e : React.ChangeEvent<HTMLInputElement>){
        const self = e.target;

        const items = self.files
        
        if(!items) return 

        const item = items[0];

        setProfileSrc(URL.createObjectURL(item));

        const data = new FormData();

        data.append("item",item);

        setProfileFormData(data);
    }

    function ClearProfileSrc(e : React.MouseEvent<HTMLButtonElement>){ 
        e.stopPropagation();
        setProfileSrc("");
        setProfileFormData(null);
    }

    function ResetProfileImg(){ 
        if(profileSrc) setProfileSrc("");
        if(profileFormData) setProfileFormData(null);
        if(getValues("userImg")) setValue("userImg", "");

        setIsProfileLayer(false);
     };

    function ResetProfileCallback(){
        setValue("userImg", "");
        if(profileSrc) setProfileSrc("");
    }

    function ToggleProfileLayer() { 

        if(!getValues("userImg") && !profileSrc) return

        setIsProfileLayer(isProfileLayer ? false : true); 
    }

    const isEdit = userInfoQuery?.["nickName"] !== watch("userNickName") || userInfoQuery?.["area"] !== watch("userArea") || userInfoQuery?.["profileImg"] !== watch("userImg") || profileSrc;
    
    return (
        <>
            <MyInfoSettingToast logoutCallback={LogoutCallback} resetProfileImgCallback={ResetProfileCallback}/>

            <div id={myInfoSettnigStyle.myInfoSetting} className={myInfoSettnigStyle[theme]}>
                <div className={myInfoSettnigStyle.inner}>
                <ul className={myInfoSettnigStyle.btnUtilList}>
                    <li>
                        <button onClick={CloseCallback}>
                            {
                                userInfoQuery && isEdit ? "취소" : "닫기"
                            }
                        </button>
                    </li>
                    {
                        userInfoQuery && isEdit &&
                        <li><button onClick={method.handleSubmit(OnSubmit)}>완료</button></li>
                    }
                    
                </ul>
                {
                    userInfoQuery ?
                    <>
                        <div className={myInfoSettnigStyle.afterLogin}>
                            <h3>프로필 편집</h3>
                            <dl>
                                <dt>
                                    <div onClick={ToggleProfileLayer} className={myInfoSettnigStyle.imgBox} style={{backgroundImage : `url(${profileSrc ? profileSrc : `${fileUrl}/${userInfoQuery["id"]}/profile/${getValues("userImg")}`})`}}>
                                        {
                                            (!watch("userImg") && !profileSrc) && <SquareUserRound className={myInfoSettnigStyle.emptyProfileImg}/>
                                        }
                                        <ul className={myInfoSettnigStyle.btnList}>
                                            {
                                                profileSrc && <li><button onClick={ClearProfileSrc}><Trash2/></button></li>
                                            }
                                            <li>
                                                <label htmlFor="userImg">
                                                    {profileSrc ? <RefreshCw/> : <ImagePlus/>}
                                                </label>
                                                <input ref={inputFile} type="file" id="userImg" hidden onChange={ProfileInputOnChange}/>
                                            </li>
                                        </ul>
                                    </div>
                                    <span>{userInfoQuery["name"]}</span>
                                    {userInfoQuery["gender"] === 0 ? <Mars/> : <Venus/>}
                                </dt>
                                <FormProvider {...method}>
                                    <dd>
                                        <input {...register("userNickName")}  type="text" placeholder="닉네임을 입력해주세요."/>    
                                    </dd>
                                    <dd>
                                        <span>거주지역</span>
                                        <SelectBox defaultSelectValue={userInfoQuery["area"]} selectListClassName={myInfoSettnigStyle.selectList} className={myInfoSettnigStyle.selectBox} id="userArea" options={area}/>
                                    </dd>
                                </FormProvider>
                                <dd><span>폰번호</span>{PhoneComma(userInfoQuery["phone"])}</dd>
                                <dd><span>생년월일</span>{BirthComma(userInfoQuery["birth"])}</dd>
                            </dl>
                            
                            <div className={myInfoSettnigStyle.utilBox}>
                                <h3>가입일 : {DateFormat(userInfoQuery["createDate"], true)}</h3>
                                <ul>
                                    {/* <li><button>회원탈퇴</button></li> */}
                                    <li><button onClick={IsLogout}>로그아웃</button></li>
                                </ul>
                            </div>
                            {
                                isProfileLayer &&
                                <div className={myInfoSettnigStyle.profileImgLayer}>
                                    <ul>
                                        <li><button onClick={ToggleProfileLayer}>닫기</button></li>
                                        <li><button onClick={ResetProfileImg}>삭제</button></li>
                                    </ul>
                                    
                                    <div className={myInfoSettnigStyle.defaultProfileImg} style={{backgroundImage : `url(${profileSrc ? profileSrc : `${fileUrl}/${userInfoQuery["id"]}/profile/${getValues("userImg")}`})`}}></div>
                                </div>
                            }
                        </div>
                    </>
                    : 
                    <>
                        <div className={myInfoSettnigStyle.beforeLogin}>
                            <Link href="/account/login" className={myInfoSettnigStyle.btnLogin}>
                            로그인</Link>
                            <ul className={myInfoSettnigStyle.accountList}>
                                <li>
                                    <Link href="/account/idSearch">아이디 찾기</Link>
                                </li>
                                <li>
                                    <Link href="/account/pwSearch">비밀번호 찾기</Link>
                                </li>
                                <li>
                                    <Link href="/account/register">회원가입</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                }
                </div>
            </div>
        </>
    )
}

