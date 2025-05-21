"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FolderHeart, Mail, Notebook, UserRound, UserCog } from 'lucide-react';

import { MyInfoSetting } from "./MyInfoSetting";

import { useToastHook } from "@/hook/useToast";

import { useThemeStore } from "@/store/useThemeStore";
import { useUserInfoStore } from "@/store/useQueryStore";

import { fileUrl } from "@/util/opts";

import bottomMenuStyles from "@/styles/(home)/shared/bottomMenu.module.css"

const BottomMenu = () => {  

    const router = useRouter();

    const { theme } = useThemeStore();

    const { favoriteQuery, userInfoQuery, promiseQuery, unReadMessageTotal } = useUserInfoStore();

    const favoriteLength = favoriteQuery?.["total"]??0;

    const promiseLength = promiseQuery?.total??0;

    const { setToastState, BeforeLoginToast } = useToastHook();

    const [isMyInfoSetting, setIsMyInfoSetting] = useState<boolean>(false);

    function LinkLoginBefore(e : React.MouseEvent<HTMLAnchorElement>) {
        
        if(userInfoQuery) return
        
        e.preventDefault();
        setToastState("로그인 후 이용 가능");
    }

    function ActiveMyInfoSetting() {setIsMyInfoSetting(true)};

    function UnActiveMyInfoSetting() {setIsMyInfoSetting(false)};

    function NaviToLoginCallback() { router.replace("/account/login") };

    return (
        <>
            <BeforeLoginToast naviToLoginCallback={NaviToLoginCallback}/>

            { isMyInfoSetting && <MyInfoSetting CloseCallback={UnActiveMyInfoSetting} /> } 

            <div id={bottomMenuStyles.bottomMenu} className={bottomMenuStyles[theme]}>
                <ul className={bottomMenuStyles.bottomMenuList}>
                    <li>
                        {/* 좋아요 한 전시 */}
                        <Link onClick={LinkLoginBefore} href="/favorite">
                            <FolderHeart/>
                            {
                                (favoriteLength > 0) &&
                                <span className={bottomMenuStyles.length}>
                                    {favoriteLength}
                                </span>    
                            }
                        </Link>
                    </li>
                    <li>
                        {/* 약속된 모임 */}
                        <Link onClick={LinkLoginBefore} href="/meeting/my">
                            <Notebook/>
                            {
                                promiseLength > 0 &&
                                <span className={bottomMenuStyles.length}>
                                    {promiseLength}
                                </span>
                            }
                        </Link>
                    </li>
                    <li>
                        {/* 1:1 메세지 */}
                        <Link onClick={LinkLoginBefore} href="/message">
                            {
                                unReadMessageTotal > 0 && 
                                <span className={bottomMenuStyles.length}>
                                    {unReadMessageTotal}
                                </span>
                            }
                            <Mail/>
                        </Link>
                    </li>
                    <li>
                        {/* 프로필 편집 */}
                        <button 
                            style={{
                                backgroundImage : `url(${fileUrl}/${userInfoQuery?.["id"]}/profile/${userInfoQuery?.["profileImg"]})`
                            }}
                            className={bottomMenuStyles.profile} 
                            onClick={ActiveMyInfoSetting}
                        >
                            { userInfoQuery && !userInfoQuery?.["profileImg"] && <UserCog/> }
                            { !userInfoQuery && <UserRound/> }
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default BottomMenu