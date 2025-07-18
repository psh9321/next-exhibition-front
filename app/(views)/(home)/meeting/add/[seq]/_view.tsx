"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useQueryClient } from "@tanstack/react-query"
import { useForm, FormProvider } from "react-hook-form"

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead"
import { ErrorMsg } from "@/component/shared/Message"
import { InputLabelMettingMembersLength } from "@/component/form/InputLabel"
import InputDate from "@/component/form/InputDate"
import { WriteEditor } from "@/component/(Home)/shared/Quill"

import { useToastHook } from "@/hook/useToast"
import { useMeetingMutation } from "@/hook/useMutation"
import { useLoadingView } from "@/hook/useLoadingView"

import { ExhibitionDateFormat, MinDateFormat } from "@/util/dateFormat"

import addBoxStyles from "@/styles/(home)/meeting/addMeeting.module.css"

import { EXHIBITION_DETAIL_ITEM } from "@/types/exhibition"
import { ADD_METTING_PAGE_PARAMS, MEETING_FORM_VALUE } from "@/types/meeting"
import { useThemeStore } from "@/store/useThemeStore"


const AddMeetingPageView = ({ seq } : ADD_METTING_PAGE_PARAMS) => {   

    const router = useRouter();

    const queryClient = useQueryClient();

    const { setToastState, AddMeetingToast } = useToastHook();

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();

    const methods = useForm<MEETING_FORM_VALUE>();

    const { AddMeeting } = useMeetingMutation();

    const { theme } = useThemeStore()

    const { mutate: addMeeting } = AddMeeting({
        successCallback(reLogin) {
            
            HideLoadingView();

            if(reLogin) return setToastState("재 로그인");

            setToastState("모임 등록 성공");
        },
        failCallback(error) {
            
            HideLoadingView();

            console.log("err",error)
            setToastState("서비스 에러");
        },
    });

    const { title, imgUrl, startDate, endDate, place, area, realmName, price } = queryClient.getQueryData([process["env"]["NEXT_PUBLIC_QUERY_KEY_EXHIBITION"],seq]) as EXHIBITION_DETAIL_ITEM;
    
    const { formState : { errors }, register, setValue } = methods;

    function getDefaulValue() : string {
        const defaultValue = 
        `
            <br/>
            <br/>
            <br/>
            <br/>
            ${title}
            <br/>
            ${ExhibitionDateFormat(String(startDate))}.${ExhibitionDateFormat(String(endDate))}
            <br/>
            ${place} (${area})
            <br/>
            <img src=${imgUrl} alt="'${title}' 커버 이미지" />
        `;

        return defaultValue
    }

    function OnSubmit(params : MEETING_FORM_VALUE){
        
        ShowLoadingView();

        addMeeting({
            ...params,
            seq,
            exhibitionImg : imgUrl,
            exhibitionTitle : title,
            exhibitionStartDate : startDate,
            exhibitionEndDate : endDate,
            exhibitionArea : area,
            exhibitionPlace : place,
            exhibitionType : realmName,
            exhibitionPrice : price
        })
    }

    function MoveToList() {
        if(
            methods["getValues"]("meetingTitle") || 
            methods["getValues"]("meetingDate") || 
            methods["getValues"]("meetingMembersLength") 
        ) {
            setToastState("수정 중 이동");
        }
        else {
            router.push("/meeting/list");
        }
    }

    function MoveToIndexCallback() { router.replace("/") }
    function MoveToMeetingCallback(){ 
        router.prefetch("/meeting/list"); 
        router.replace("/meeting/list") 
    }
    
    return (
        <>
            <AddMeetingToast 
                moveToIndexCallback={MoveToIndexCallback} 
                moveToMeetingCallback={MoveToMeetingCallback}
            />

            <LoadingElement/>

            <HeadTitle title="모임 만들기" />
            <div className={`${addBoxStyles.addBox} ${addBoxStyles[theme]}`}>
                <h3>
                    <Link title="클릭시 해당 전시 상세 페이지로 이동" href={`/exhibition/detail/${seq}`}>{`"${title}"`}</Link>
                </h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods["handleSubmit"](OnSubmit)} className={addBoxStyles.addGatheringForm}>
                        <ul className={addBoxStyles.formList}>
                            <li>
                                <input {...register("meetingTitle", {
                                    required : "모임 명을 입력해주세요."
                                })} type="text" placeholder="모임 명을 입력해주세요." />
                                <ErrorMsg _className={addBoxStyles.errorMsg} txt={errors?.meetingTitle?.message} />
                            </li>
                            <li className={addBoxStyles.members}>
                                <InputLabelMettingMembersLength id="meetingMembersLength" labelName="정원 (2 ~ 100)">
                                    <ErrorMsg _className={addBoxStyles.errorMsg} txt={errors?.meetingMembersLength?.message} />
                                </InputLabelMettingMembersLength>
                            </li>
                            <li>
                                <label htmlFor="">모임 날짜</label>
                                <InputDate id="meetingDate" minDate={MinDateFormat()} maxDate={ExhibitionDateFormat(String(endDate)).replaceAll(".","-")} />
                                <ErrorMsg _className={addBoxStyles.errorMsg} txt={errors?.meetingDate?.message} />
                            </li>
                            <li>
                                <WriteEditor 
                                    id="meetingContents" 
                                    className={addBoxStyles.textContents}
                                    value={getDefaulValue()}
                                    onChange={(e) => {
                                        setValue("meetingContents",e as string);
                                    }}
                                />
                            </li>
                        </ul>
                        <ul className={addBoxStyles.btnList}>
                            <li>
                                <button onClick={MoveToList} type="button">취소</button>
                            </li>
                            <li>
                                <button type="submit">등록</button>
                            </li>
                        </ul>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}

export default AddMeetingPageView