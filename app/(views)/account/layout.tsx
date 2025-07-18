import { redirect } from "next/navigation"

import { getToken } from "@/util/token"
import { API_SERVER_AUTH } from "@/api/auth.server"

import AccountUtilMenu from "@/component/account/AccountUtilMenu"

import accountStyle from "@/styles/account/account.module.css"

import { AUTH_TOKEN_RESPONSE } from "@/types/auth"
import { LAYOUT_CHILD } from "@/types/component"

const AccountPageRoot = async ({children} : LAYOUT_CHILD) => {

    const token = await getToken();

    if(token) {
        const isAuth = await API_SERVER_AUTH(token) as AUTH_TOKEN_RESPONSE;

        if(isAuth["resultCode"] === 200) return redirect("/");
    }

    return (
        <>
            <div className={accountStyle.background}>
                <video className={accountStyle.backgroundVideo} muted loop playsInline autoPlay>
                    <source src="/loadingVideo1.webm" />
                </video>
            </div>
            <section id={accountStyle.account}>                
                {children} 
                <AccountUtilMenu/>
            </section>
        </>
    )
}

export default AccountPageRoot