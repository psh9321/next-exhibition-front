"use client"

import { Heart } from 'lucide-react';
import { useRouter } from "next/navigation";

import { useFavoriteMutation } from '@/hook/useMutation';
import { useToastHook } from "@/hook/useToast";

import { useUserInfoStore } from '@/store/useQueryStore';

import exhibitionListStyles from "@/styles/(home)/shared/exhibitionList.module.css"

import { FAVORITE_ITEM } from "@/types/favorite"

interface BTN_FAVORITE {
    item : FAVORITE_ITEM,
}

const BtnFavorite = ({item} : BTN_FAVORITE) => {

    const router = useRouter();

    const { setToastState, BeforeLoginToast } = useToastHook();

    const { AddFavorite, RemoveFavorite } = useFavoriteMutation();

    const { mutateAsync : FavoriteAddCallback } = AddFavorite();
    const { mutateAsync : FavoriteRemoveCallback } = RemoveFavorite();

    const { userInfoQuery, favoriteQuery } = useUserInfoStore();

    const favoriteData = favoriteQuery?.["favorite"]??[];
    
    const isActive = favoriteData && favoriteData?.some(el => el["seq"] === String(item["seq"]))

    function ConvertToString(data : FAVORITE_ITEM) {
        const property = Object.entries(data);

        const result = {} as FAVORITE_ITEM;

        for(let i = 0; i < property.length; i++) {
            const key = property[i][0] as keyof FAVORITE_ITEM | "imgUrl";

            if(key === "imgUrl") {
                result["thumbnail"] = property[i][1] as keyof FAVORITE_ITEM;
            }
            else {
                result[key] = String(property[i][1] as keyof FAVORITE_ITEM);
            }
        }

        return result
    }
    
    async function ToggleFavorite(e : React.MouseEvent<HTMLButtonElement>){

        e.preventDefault();
        e.stopPropagation();

        if(!userInfoQuery) return setToastState("로그인 후 이용 가능")
    
        if(isActive) {
            await FavoriteRemoveCallback([item["seq"]]);
        }
        else {
            const resultItem : FAVORITE_ITEM = ConvertToString(item);
            await FavoriteAddCallback(resultItem);
        }
    }

    function NaviToLoginCallback() { router.replace("/account/login") };

    return (
        <>
            <BeforeLoginToast naviToLoginCallback={NaviToLoginCallback}/>
            <button onClick={ToggleFavorite} className={`${exhibitionListStyles.btnFavorite} ${(isActive) && exhibitionListStyles.active}`}>
                <Heart fill={isActive ? "rgb(245, 49, 49)" : "transparent"}/>
            </button>
        </>
    )
}

export default BtnFavorite