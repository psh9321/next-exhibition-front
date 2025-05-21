import { redirect } from "next/navigation"

import messageStyles from "@/styles/(home)/message/message.module.css"

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead"
import MessageList from "@/component/(Home)/message/MessageRoomList"

import { getToken } from "@/util/token"

import { API_SERVER_AUTH } from "@/api/auth.server"

import { LAYOUT_CHILD } from "@/types/component"
import { AUTH_TOKEN_RESPONSE } from "@/types/auth"



const MessagePageRoot = async ({ children } : LAYOUT_CHILD) => {

    const token = await getToken();

    if(!token) return redirect("/");

    const isAuth = await API_SERVER_AUTH(token) as AUTH_TOKEN_RESPONSE;

    if(isAuth["resultCode"] !== 200) return redirect("/");

    return (
        <>
            <HeadTitle title="1:1 메세지" />
            <article className={messageStyles["messageContainer"]}>
                <h2 className="hidden">메세지 페이지</h2>
                <MessageList/>
                <div className={messageStyles.messageContents}>
                    {children}
                </div>
            </article>
        </>
    )
}

export default MessagePageRoot