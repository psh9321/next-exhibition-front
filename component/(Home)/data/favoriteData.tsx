"use client"

import Link from "next/link";

import { useUserInfoStore } from "@/store/useQueryStore";
import { useListModeStore } from "@/store/useListModeStore";

import { ExhibitionDateFormat } from "@/util/dateFormat";

import exhibitionListStyles from "@/styles/(home)/shared/exhibitionList.module.css"

import { FAVORITE_ITEM } from "@/types/favorite"


const FavoriteData = () => {

    const { favoriteQuery } = useUserInfoStore();

    const { listMode } = useListModeStore();

    const favoriteData = favoriteQuery?.favorite??[] as (FAVORITE_ITEM[] | []);

    return (
        <>
            <ul className={exhibitionListStyles[`exhibitionList${listMode}`]}>
                {
                    favoriteData.length > 0 ? 
                    favoriteData.map(el => {
                        const { thumbnail, title, place, area, startDate, endDate,seq } = el as FAVORITE_ITEM;

                        return (
                            <li key={title} style={{backgroundImage : `url(${thumbnail})`}}>
                                <Link href={`/exhibition/detail/${seq}`}>
                                    <div className={exhibitionListStyles.infoBox}>
                                        <dl>
                                            <dt>{decodeURIComponent(title)}</dt>
                                            <dd className={exhibitionListStyles.date}>{ExhibitionDateFormat(String(startDate))} ~ {ExhibitionDateFormat(String(endDate))}</dd>
                                            <dd className={exhibitionListStyles.area}>{place} ({area})</dd>
                                        </dl>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                    : 
                    <li className={exhibitionListStyles.searchEmpty}>
                        <dl>
                            <dt>“좋아요 한 전시” 가 없습니다.</dt>
                            <dd>마음에 드는 전시를 추가 해보세요.</dd>
                            <dd><Link href={"/"}>전시 보기</Link></dd>
                        </dl>
                    </li>
                }
            </ul>
        </>
    )
}

export default FavoriteData