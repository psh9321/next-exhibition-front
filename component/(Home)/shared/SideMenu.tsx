"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { UserRound } from 'lucide-react';

import { MyInfoSetting } from "./MyInfoSetting";

import { useToastHook } from "@/hook/useToast";

import { useUserInfoStore } from "@/store/useQueryStore";
import { useThemeStore } from "@/store/useThemeStore"

import { fileUrl } from "@/util/opts";

import sideMenuStyles from "@/styles/(home)/shared/sideMenu.module.css"


const SideMenu = () => {
    
    const router = useRouter();

    const pathname = usePathname();

    const { favoriteQuery, userInfoQuery, promiseQuery, unReadMessageTotal } = useUserInfoStore();

    const { theme } = useThemeStore();

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

            { userInfoQuery && isMyInfoSetting && <MyInfoSetting CloseCallback={UnActiveMyInfoSetting} /> } 

            <aside id={sideMenuStyles.sideMenu} className={sideMenuStyles[theme]}>
                <div className={sideMenuStyles.myInfo}>
                    {
                        userInfoQuery ? 
                        <h3>
                            <div
                                onClick={ActiveMyInfoSetting}
                                style={{
                                    backgroundImage : `url(${userInfoQuery["profileImg"] && `${fileUrl}/${userInfoQuery["id"]}/profile/${userInfoQuery["profileImg"]}`})`
                                }}
                                className={sideMenuStyles.imgBox}
                            >
                                {!userInfoQuery["profileImg"] && <UserRound/>}
                            </div>
                            {userInfoQuery["nickName"]??""}
                        </h3>
                        : 
                        <>
                            <Link href="/account/login" className={sideMenuStyles.btnLogin}>
                                로그인
                            </Link>
                            <ul className={sideMenuStyles.accountList}>
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
                        </>
                    }
                    <ul className={sideMenuStyles.utilList}>
                        {/* <li>
                            <BtnTheme className={sideMenuStyles.btnTheme}/>
                        </li> */}
                        {
                            userInfoQuery && 
                            <li>
                                <button onClick={ActiveMyInfoSetting} className={sideMenuStyles.btnUser}>
                                    <UserRound/>
                                </button>
                            </li>
                        }
                    </ul>
                </div>
                <ul className={sideMenuStyles.sideList}>
                    <li>
                        <Link className={`${pathname === "/favorite" && sideMenuStyles.active}`} onClick={LinkLoginBefore} href="/favorite">
                            좋아요 한 공연/전시
                            {
                                favoriteLength > 0 && 
                                <span className={sideMenuStyles.length}>
                                    {favoriteLength}
                                </span> 
                            }
                        </Link>
                    </li>
                    <li>
                        <Link className={`${pathname === "/meeting/my" && sideMenuStyles.active}`} onClick={LinkLoginBefore} href="/meeting/my">
                            약속된 모임
                            {
                                promiseLength > 0 &&
                                <span className={sideMenuStyles.length}>
                                    {promiseLength}
                                </span>
                            }
                        </Link>
                    </li>
                    <li>
                        <Link className={`${pathname.includes("message") && sideMenuStyles.active}`} onClick={LinkLoginBefore} href="/message">
                            1:1 메세지
                            {
                                unReadMessageTotal > 0 && 
                                <span className={sideMenuStyles.length}>
                                    {unReadMessageTotal}
                                </span>
                            }
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default SideMenu