"use client"

import { useForm, FormProvider } from "react-hook-form"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"

import { X } from 'lucide-react';

import SelectBox from '@/component/form/SelectBox';
import { InputLabelSearch } from "@/component/form/InputLabel"
import InputDate from "../../form/InputDate";
import { ErrorMsg } from "../../shared/Message";

import { useLoadingView } from "@/hook/useLoadingView"
import { useToastHook } from "@/hook/useToast";
import { useThemeStore } from "@/store/useThemeStore"

import { area } from "@/util/opts";

import searchBoxStyles from "@/styles/(home)/shared/searchBox.module.css"


interface SEARCH_BOX_FORM_VALUE {
    searchKeyword? : string,
    searchStartDate? : string,
    searchEndDate? : string,
    searchArea? : string
}

const LOCALSTORAGE_KEY = "clapPortfolio-recent-keyword"

const SearchBox = ({closeLayerCallback} : {closeLayerCallback : () => void}) => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const methods = useForm<SEARCH_BOX_FORM_VALUE>({
        defaultValues : {
            searchKeyword : searchParams.get(`searchKeyword`)??"",
            searchArea : searchParams.get(`searchArea`)??"전체",
            searchEndDate : GetDateValue("End")??"",
            searchStartDate : GetDateValue("Start")??""
        }
    });

    const { formState : { errors }, setError, setValue, watch } = methods;

    const [isActive, setIsActive] = useState<boolean>(true);

    const [ recentArr, setRecentArr ] = useState<string[]>([]);

    const { SearchBoxToast, setToastState } = useToastHook();

    const { theme } = useThemeStore();

    function GetDateValue(type : "Start" | "End"){
        const value = searchParams.get(`search${type}Date`);
        
        if(!value) return ""

        const year = value?.substring(0,4);
        const month = value?.substring(4,6);
        const day = value?.substring(6,8);

        return `${year}-${month}-${day}`
    };

    function SetRecentKeyword(arr : string[]) {

        const item = {
            keyword : [...new Set(arr)]
        }

        localStorage.setItem(LOCALSTORAGE_KEY, encodeURIComponent(JSON.stringify(item)));
    }

    function DeleteTargetRecent(keyword : string){

        setRecentArr(arr => {

            const newArr = [...arr];

            const idx = newArr.findIndex(el => el === keyword);

            newArr.splice(idx, 1);

            SetRecentKeyword(newArr);

            return newArr
        })
    }

    function DeleteAllRecent(){ setToastState("전체 키워드 삭제") };

    function DeleteAllRecentCallback(){
        setRecentArr([]);
        localStorage.removeItem(LOCALSTORAGE_KEY);
    }

    function BtnCloseCallback(){ setIsActive(false) }

    function AnimEndCallback(){
        if(!isActive) closeLayerCallback();
    }

    function OnSubmit(params : SEARCH_BOX_FORM_VALUE){

        const { searchStartDate, searchEndDate, searchKeyword } : SEARCH_BOX_FORM_VALUE = params

        if((searchStartDate && !searchEndDate) || (searchEndDate && !searchStartDate) || new Date(searchEndDate!) < new Date(searchStartDate!)) {
            return setError("searchStartDate", { message : "날짜를 확인해주세요."})
        }

        const searchParams =  new URLSearchParams();

        for(const i in params ) {
            const key = i as keyof SEARCH_BOX_FORM_VALUE;
            const value = params[key] as string;
            
            if(!params[key]) continue;

            if(key === "searchStartDate" || key === "searchEndDate") {
                searchParams.set(key, value.replaceAll("-",""));
            }
            else {
                searchParams.set(key, value);
            }
        }

        const newRecentArr = [...recentArr];

        newRecentArr.push(searchKeyword as string);

        SetRecentKeyword(newRecentArr);
        
        router.push(`/searchResult?${searchParams.toString()}`);

        BtnCloseCallback()
    }

    useEffect(() => {

        const recentItemStr = localStorage.getItem(LOCALSTORAGE_KEY);

        if(recentItemStr) {
            const { keyword } = JSON.parse(decodeURIComponent(recentItemStr));
            
            setRecentArr(keyword)
        }

        return () => {
            setRecentArr([]);
        }
    },[])

    return (
        <>
            <SearchBoxToast deleteCallback={DeleteAllRecentCallback}/>      

            <div className={`${searchBoxStyles.searchBox} ${searchBoxStyles[theme]}`}>
                <div className={`${searchBoxStyles.inner} ${isActive ? searchBoxStyles.show : searchBoxStyles.hide}`} onAnimationEnd={AnimEndCallback}>
                <FormProvider {...methods}>
                    <form onSubmit={methods["handleSubmit"](OnSubmit)} className={searchBoxStyles.searchForm}>
                        <ul className={searchBoxStyles.searchFormList}>
                            <li>
                                <InputLabelSearch id="searchKeyword" labelName="공연/전시 명" value={watch("searchKeyword")}>
                                <ErrorMsg _className={searchBoxStyles.errorMsg} txt={errors.searchKeyword?.message}/>
                                </InputLabelSearch>
                            </li>
                            <li>
                                <h3>공연/전시 지역 선택</h3>
                                <SelectBox 

                                    className={searchBoxStyles.selectBox}
                                    defaultSelectValue={watch("searchArea")}
                                    id='searchArea' 
                                    options={area} 
                                />
                            </li>
                            <li>
                                <h3>날짜 선택</h3>
                                <div className={searchBoxStyles.dateInputBox}>
                                    <InputDate id="searchStartDate" value={GetDateValue("Start")} />
                                    <span>~</span>
                                    <InputDate id="searchEndDate" value={GetDateValue("End")} />
                                </div>
                                <ErrorMsg _className={searchBoxStyles.errorMsg} txt={errors.searchStartDate?.message}/>
                            </li>
                        </ul>
                        <button type="submit">검색</button>
                    </form>
                </FormProvider>
                <div className={searchBoxStyles.recentBox}>
                    <h3>최근 검색어 
                        {
                            recentArr.length > 0 && <button onClick={DeleteAllRecent} className={searchBoxStyles.btnAllDelete}>
                            검색어 전체 삭제</button>
                        }
                        
                    </h3>
                    <ul className={`${searchBoxStyles.recentList} ${recentArr.length <= 0 && searchBoxStyles["empty"]}`}>

                        {
                            recentArr.length > 0 ?
                            recentArr.map((el, i) => 
                                <li key={`${el}-${i}`}>
                                    <button onClick={() => {
                                        setValue("searchKeyword", el)
                                    }} className={searchBoxStyles.btnKeyword}>{el}</button>
                                    <button onClick={() => DeleteTargetRecent(el)} className={searchBoxStyles.btnDelete}>
                                        <span></span><span></span>
                                    </button>
                                </li>    
                            ) : 
                            <li className={searchBoxStyles.emptyContents}>
                                * 최근 검색어가 없습니다.
                            </li>
                        }
                        
                    </ul>
                </div>
                    <button type="button" className={searchBoxStyles.btnClose} onClick={BtnCloseCallback}>
                        <X width={35} height={35}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SearchBox