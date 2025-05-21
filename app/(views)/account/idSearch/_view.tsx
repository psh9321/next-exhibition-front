"use client"

import Link from "next/link"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { InputLabelName, InputLabelPhone } from "@/component/form/InputLabel"
import { ErrorMsg } from "@/component/shared/Message"
import { BtnNaviHome } from "@/component/account/BtnHome"

import { useLoadingView } from "@/hook/useLoadingView"
import { useToastHook } from "@/hook/useToast"

import { ID_SEARCH_FROM_VALUE, ID_SEARCH_SUCCESS_DATA  } from "@/types/account/idSearch"

import { API_ACCOUNT_ID_SEARCH } from "@/api/account.client"

import accountStyles from "@/styles/account.module.css"


const IdSearchPageView = () => {

    const methods = useForm<ID_SEARCH_FROM_VALUE>();

    const { IdSearchToast, setToastState } = useToastHook();

    const { ShowLoadingView, HideLoadingView, LoadingElement } = useLoadingView();

    const [searchData, setSearchData] = useState<ID_SEARCH_SUCCESS_DATA | null>(null);

    function OnSubmit(data : ID_SEARCH_FROM_VALUE) {

        ShowLoadingView();

        API_ACCOUNT_ID_SEARCH(data)
        .then(rs => {

            HideLoadingView();

            if(!rs) return setToastState("아이디 찾기 실패");

            setSearchData(rs);
        })
        .catch(err => {
            HideLoadingView();
            setToastState("서비스 에러");
            console.log("idsearch page.ts idsearch error", err)
        })
    }
    
    return (
        <>    
            <BtnNaviHome className={accountStyles.btnNaviHome}/>
            
            <div className={accountStyles.idSearch}>
                <h3 className={accountStyles.logo}>아이디 찾기</h3>
                {
                    searchData ?
                    <>
                        <dl className={accountStyles.searchResultBox}>
                            <dt>고객님의 정보와 일치하는 아이디 입니다.</dt>
                            <dd className={accountStyles.id}>{`"${searchData["id"]}"`}</dd>
                            <dd className={accountStyles.date}>가입일 : {searchData["createDate"]}</dd>
                        </dl> 
                        <div className={accountStyles.submitBox}>
                            <Link className="btnLink" href={"/account/login"}>로그인</Link>
                        </div>
                    </>
                    : 
                    <FormProvider {...methods}>                    

                        <LoadingElement/>

                        <IdSearchToast/>

                        <form onSubmit={methods["handleSubmit"](OnSubmit)}>
                            {/* <LoadingElement/> */}

                            <ul className={accountStyles.inputList}>
                                <li>
                                    <InputLabelName labelName="이름" id="searchName">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.searchName?.message}/>                    
                                    </InputLabelName>
                                </li>
                                <li>
                                    <InputLabelPhone labelName="폰번호" id="searchPhone">
                                        <ErrorMsg _className={accountStyles.errorMsg} txt={methods.formState.errors?.searchPhone?.message}/>
                                    </InputLabelPhone>
                                </li>
                            </ul>
                            <div className={accountStyles.submitBox}><button type="submit">아이디 찾기</button></div>
                        </form>
                    </FormProvider>
                }
            </div>
        </>
    )
}

export default IdSearchPageView