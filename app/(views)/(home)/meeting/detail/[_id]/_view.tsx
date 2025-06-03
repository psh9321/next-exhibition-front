"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form"

import { Send } from 'lucide-react';

import { HeadTitle } from "@/component/(Home)/shared/ClientWrapperHead"
import { ErrorMsg } from "@/component/shared/Message"
import { InputLabelMettingMembersLength } from "@/component/form/InputLabel"
import InputDate from "@/component/form/InputDate"
import { WriteEditor } from "@/component/(Home)/shared/Quill"
import UserList from "@/component/(Home)/meeting/detail/UserList";

import { useUserInfoStore } from "@/store/useQueryStore";
import { useLoadingView } from "@/hook/useLoadingView";
import { useToastHook } from "@/hook/useToast"
import { useMeetingMutation } from "@/hook/useMutation";

import { ExhibitionDateFormat, MinDateFormat } from "@/util/dateFormat"

import addBoxStyles from "@/styles/(home)/meeting/addMeeting.module.css"

import { MEETING_FORM_VALUE, MEETING_DETAIL_RESPONSE_DATA, MEMBERS_INFO } from "@/types/meeting"

const DetailMeetingPageView = ({ data } : { data : MEETING_DETAIL_RESPONSE_DATA }) => {


    const { meetingInfo, membersInfo } = data;

    const router = useRouter();

    const { userInfoQuery } = useUserInfoStore();

    const { title, date, membersTotal, seq, contents, exhibitionTitle, exhibitionEndDate, createUserId, createUserNickName,  _id, createUserKey } = meetingInfo;
    
    const methods = useForm<MEETING_FORM_VALUE>({
        defaultValues : {
            meetingTitle : title,
            meetingContents : contents,
            meetingDate : date,
            meetingMembersLength : membersTotal,
        }
    });

    const { formState : { errors }, register, setValue, getValues, watch } = methods;

    const { setToastState, DetailMeetingToast, BeforeLoginToast } = useToastHook();

    const { LoadingElement, ShowLoadingView, HideLoadingView } = useLoadingView();

    const { DeleteMeeting, UpdateMeeting, AttendMeeting, AttendCancelMeeting } = useMeetingMutation();

    const { mutate : DeleteMeetingCallback } = DeleteMeeting({
        successCallback(isReload) {
            HideLoadingView();

            if(isReload) return setToastState("재 로그인");
            
            setToastState("해당 모임 삭제 성공", getValues("meetingTitle"));
        },
        failCallback(error) {
            HideLoadingView();
            console.log("err", error)
        },
    });

    const { mutate : UpdateMeetingCallback } = UpdateMeeting({
        successCallback(isReload?) {
            HideLoadingView();

            if(isReload) return setToastState("재 로그인");

            router.refresh();

            setToastState("수정 성공");
        },
        failCallback(error) {
            HideLoadingView();
            console.log("err", error)
            setToastState("서비스 에러");
        },
    });

    const { mutate : attendMeetingCallback } = AttendMeeting({
        successCallback(isReload?) {
            HideLoadingView();
            if(isReload) return setToastState("재 로그인");
            router.refresh();
        },
        failCallback(error) {
            HideLoadingView();
            console.log("err", error)
            setToastState("서비스 에러");
        },
    });

    const { mutate : AttendCancelMeetingCallback } = AttendCancelMeeting({
        successCallback(isReload?) {
            HideLoadingView();
            if(isReload) return setToastState("재 로그인");
            router.refresh();
        },
        failCallback(error) {
            HideLoadingView();
            console.log("err", error)
            setToastState("서비스 에러");
        }, 
    })
    
    const isAttend : boolean = !!membersInfo.find(el => el["id"] as keyof MEMBERS_INFO === userInfoQuery?.["id"]);

    function OnSubmit({meetingDate, meetingContents, meetingTitle, meetingMembersLength} : MEETING_FORM_VALUE){

        if(
            meetingTitle?.trim() === title?.trim() && 
            HtmlToText(meetingContents as string) === HtmlToText(contents as string) &&
            meetingDate === date &&
            Number(meetingMembersLength) === membersTotal) {
            return
        }

        setToastState("모임 수정", title);
    }

    function NaviToMeetingCallback() { 
        router.prefetch("/meeting/list"); 
        router.replace("/meeting/list") 
    };

    function NaviToLoginCallback() { router.replace("/account/login") };

    function TargetDelete(){ setToastState("해당 모임 삭제", title) }

    function DeleteCallback(){ 

        ShowLoadingView();

        DeleteMeetingCallback({
            deleteId : _id, 
            seq
        });
    };

    function HtmlToText(html: string) {
        const div = document.createElement("div");

        div.innerHTML = html;

        const all = div.querySelectorAll("*");

        for(let i = 0; i < all.length; i++) {
            all[i].innerHTML = all[i].innerHTML.trim();
        }

        return div.innerHTML
    }

    function MoveToList(){
        
        if(
            getValues("meetingTitle")?.trim() === title?.trim() && 
            HtmlToText(getValues("meetingContents") as string) === HtmlToText(contents as string) &&
            getValues("meetingDate") === date &&
            getValues("meetingMembersLength") === membersTotal
        ) {
            router.push(`/meeting/list/${seq}`);   
        }
        else {
            setToastState("수정 중 이동");
        }
    }

    function LinkLoginBefore(e : React.MouseEvent<HTMLAnchorElement>) {
        
        if(userInfoQuery) return

        e.preventDefault();
        setToastState("로그인 후 이용 가능");
    }

    function MeetingAttend(){
        if(!userInfoQuery) return setToastState("로그인 후 이용 가능");

        if(membersTotal === membersInfo.length && !isAttend) return setToastState("모임 정원 초과");

        setToastState(isAttend ? "모임 참석 취소" : "모임 참석");
    }

    function AttendMeetingCallback(){

        ShowLoadingView();

        attendMeetingCallback(_id);
    }

    function CancelMeetingCallback(){

        ShowLoadingView();

        AttendCancelMeetingCallback(_id);
    }

    function UpdateCallback(){

        ShowLoadingView();

        const result = {
            ...watch(),
            _id,
            seq
        }
        
        UpdateMeetingCallback(result);
    }
    
    return (
        <>

            <LoadingElement/>
        
            <DetailMeetingToast 
                deleteCallback={DeleteCallback} 
                moveToMeetingCallback={NaviToMeetingCallback} attendMeetingCallback={AttendMeetingCallback}
                cancelMeetingCallback={CancelMeetingCallback}
                updateMeetingCallback={UpdateCallback}
             />

            <BeforeLoginToast naviToLoginCallback={NaviToLoginCallback} />

            <HeadTitle title={`모임장 : ${ userInfoQuery?.id === createUserId ? userInfoQuery["nickName"] : createUserNickName}`}>
                {
                    
                    userInfoQuery?.["id"] !== createUserId &&
                    <Link onClick={LinkLoginBefore} href={`/message/${userInfoQuery?.["key"]}/${createUserKey}`}><Send /></Link>
                }            
            </HeadTitle>
            <div className={addBoxStyles.addBox}>
                <h3>
                    <Link title="클릭시 해당 전시 상세 페이지로 이동" href={`/exhibition/detail/${seq}`}>{`"${exhibitionTitle}"`}</Link>
                </h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods["handleSubmit"](OnSubmit)} className={addBoxStyles.addGatheringForm}>
                        <ul className={addBoxStyles.formList}>
                            <li>
                                <input 
                                {...register("meetingTitle", {
                                    required : "모임 명을 입력해주세요."
                                })} type="text" placeholder="모임 명을 입력해주세요." defaultValue={title}
                                    disabled={userInfoQuery?.["id"] !== createUserId}
                                />
                            </li>
                            <li className={addBoxStyles.members}>
                                <InputLabelMettingMembersLength 
                                isReadDisabled={(userInfoQuery && userInfoQuery["id"]) !== createUserId}
                                value={String(membersTotal??"")} id="meetingMembersLength" labelName={`정원 ${userInfoQuery?.["id"] === createUserId ? "(2 ~ 100)" : ""}`}>
                                    <ErrorMsg _className={addBoxStyles.errorMsg} txt={errors?.meetingMembersLength?.message} />
                                </InputLabelMettingMembersLength>
                                <UserList createUserId={createUserId} membersInfo={membersInfo} />
                            </li>
                            <li>
                                <label>모임 날짜</label>
                                <InputDate 
                                    id="meetingDate" 
                                    value={date}
                                    minDate={MinDateFormat()}
                                    maxDate={ExhibitionDateFormat(exhibitionEndDate).replaceAll(".","-")} 
                                    isReadDisabled={userInfoQuery?.["id"] !== createUserId}
                                    />
                                <ErrorMsg _className={addBoxStyles.errorMsg} txt={errors?.meetingDate?.message} />
                            </li>
                            <li>
                                <WriteEditor 
                                    id="meetingContents" 
                                    
                                    className={`${addBoxStyles.textContents} ${userInfoQuery?.["id"] !== createUserId && addBoxStyles.readonly}`}
                                    value={watch("meetingContents")}
                                    onChange={(e) => {
                                        setValue("meetingContents",e as string, {shouldDirty : true});
                                    }}
                                />
                            </li>
                        </ul>
                        <ul className={addBoxStyles.btnList}>
                            <li>
                                <button onClick={MoveToList} type="button">모임 목록으로</button>
                            </li>
                            {
                                userInfoQuery?.["id"] === createUserId ?
                                <>
                                    <li>
                                        <button type="submit">수정</button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={TargetDelete}>삭제</button>
                                    </li>
                                </> 
                                :
                                <li>
                                    <button type="button" onClick={MeetingAttend}>모임 { isAttend ? "참석 취소" : "참석"}</button>
                                </li>
                            }
                            
                        </ul>
                    </form>
                </FormProvider>
            </div>    
        </>
    )
}

export default DetailMeetingPageView