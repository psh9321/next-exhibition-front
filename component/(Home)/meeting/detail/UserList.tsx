"use client"

import Link from "next/link";
import { useState } from "react";

import { UserRound, Send } from 'lucide-react';

import { useUserInfoStore } from "@/store/useQueryStore";

import { fileUrl } from "@/util/opts";

import addBoxStyles from "@/styles/(home)/meeting/addMeeting.module.css"

import { MEMBERS_INFO } from "@/types/meeting"




interface USER_LIST_PROPS {
    membersInfo : MEMBERS_INFO[],
    createUserId : string,
}

const UserList = ({membersInfo, createUserId} : USER_LIST_PROPS) => {
    
    const { userInfoQuery } = useUserInfoStore();

    const [visibleId, setVisibleId] = useState<string>("");

    function Event(e : React.MouseEvent<HTMLElement>, id : string){
         if(e.target === e.currentTarget || e.target instanceof SVGElement) setVisibleId(id)
        else setVisibleId("");        
    }

    
    
    return (
        <dl className={addBoxStyles.userBox}>
            <dt>현재 인원 : {membersInfo.length}</dt>
            <dd>
                <ul className={addBoxStyles.userList}>
                    {                        
                        membersInfo.map((el, i) => {
                            const { nickName, id, profileImg, area, key } = el;
                            const isVisible = visibleId === id;
                            const resultName = createUserId === userInfoQuery?.["id"] ? userInfoQuery?.["nickName"]??nickName : nickName;

                            return (
                                <li
                                    className={`${!profileImg && addBoxStyles["profileImgNull"]}`}
                                    onClick={(e) => Event(e, id)}
                                    key={id + i}
                                    style={{backgroundImage:`url(${profileImg && `${fileUrl}/${id}/profile/${profileImg}`})`}}
                                >
                                    {isVisible && <p>{createUserId !== id && <Link href={`/message/${userInfoQuery?.["key"]}/${key}`}><Send/></Link>}{resultName}<span>/{area}</span></p>}
                                    
                                    {!profileImg && <UserRound />}
                                </li>
                            )
                        })
                    }
                </ul>
            </dd>
        </dl>
    )
}

export default UserList