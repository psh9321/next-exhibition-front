"use client"

import { MessageSquareWarning } from "lucide-react"

import messageStyles from "@/styles/(home)/message/message.module.css"
import { useThemeStore } from "@/store/useThemeStore"

const MessageDefaultView = () => {

    const { theme } = useThemeStore();

    return (
        <>
            <div className={`${messageStyles.default} ${messageStyles[theme]}`}>
                <div className={messageStyles.imgBox}>
                    <MessageSquareWarning/>
                </div>
                <dl>
                    <dt>내 메세지</dt>
                    <dd>메세지는 모임장과 의 1:1 대화만 가능 합니다.</dd>
                </dl>
            </div>
        </>
    )
}

export default MessageDefaultView