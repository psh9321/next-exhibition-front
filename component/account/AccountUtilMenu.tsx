"use client"

import Link from 'next/link'
import { usePathname } from "next/navigation";

import accountStyles from "@/styles/account/account.module.css"

interface BUTTON_TYPE {
    href : string,
    txt : string
}

const AccountUtilMenu = () => {

    const pathname = usePathname();

    const btns : BUTTON_TYPE[] = [
        { href : "/account/login", txt : "로그인" },
        { href : "/account/idSearch", txt : "아이디 찾기" },
        { href : "/account/pwSearch", txt : "비밀번호 찾기" },
        { href : "/account/register", txt : "회원가입" },
    ];

    if(pathname === "/account/register") return <></>
    
    return (
        <ul className={accountStyles.accountUtilMenu}>
            {
                btns.map(item => {

                    if(item["href"] !== pathname) {
                        return (
                            <li key={item["txt"]}>
                                <Link href={item["href"]}>{item["txt"]}</Link>
                            </li>
                        )
                    }
                    
                })
            }
        </ul>
    )
}

export default AccountUtilMenu