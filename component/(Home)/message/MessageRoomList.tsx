"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

import { UserRound } from "lucide-react"

import { useUserInfoStore } from "@/store/useQueryStore"

import messageStyles from "@/styles/(home)/message/message.module.css"

import { MESSAGE_ROOM_ITEM } from "@/types/message"

import { DateFormat } from "@/util/dateFormat"
import { fileUrl } from "@/util/opts";

const MessageRoomList = () => {

    const { messageQuery, userInfoQuery } = useUserInfoStore();

    const pathname = usePathname();

    return (
        <>
            <ul className={messageStyles.messageRoomList}>
                {
                    messageQuery.map(el => {
                        const { roomInfo, users, unReadMessage } = el;

                        const { ids, lastMessage } = roomInfo as MESSAGE_ROOM_ITEM;

                        const anotherKey = ids.find(el => el !== userInfoQuery?.["key"]) as string;
                        
                        const { nickName, profileImg, id } = users[anotherKey];

                        return <li key={JSON.stringify(ids)} className={`${ pathname.includes(anotherKey) && messageStyles.active}`}>
                        <Link href={`/message/${userInfoQuery?.["key"]}/${anotherKey}`}>
                            <div className={messageStyles.imgBox} style={{backgroundImage : `url(${profileImg && `${fileUrl}/${id}/profile/${profileImg}`})`}}>
                                { !profileImg && <UserRound/> }
                            </div>
                            <dl>
                                <dt>전시 보러가요!!</dt>
                                <dd>{nickName}</dd>
                                <dd>{lastMessage["message"]}</dd>
                                <dd className={messageStyles.date}>{DateFormat(lastMessage["sendDate"], true)}</dd>
                            </dl>
                            {
                               unReadMessage > 0 && <span className={messageStyles.postNo}>{unReadMessage}</span>
                            }
                        </Link>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default MessageRoomList