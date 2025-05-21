"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserInfoStore } from "@/store/useQueryStore";

import { API_USER_SET, API_USER_GET } from "@/api/user.client";
import { API_FAVORITE_ADD, API_FAVORITE_REMOVE, API_FAVORITE_LIST } from "@/api/favorite.client";
import { API_MEETING_PROMISE, API_MEETING_ADD, API_MEETING_DELETE, API_MEETING_UPDATE, API_MEETING_ATTEND, API_MEETING_ATTEND_CANCEL } from "@/api/meeting.client";
import { API_MESSAGE_GET } from "@/api/message.client";

import { USER_FORM_VALUE, USER_INFO } from "@/types/user"
import { FAVORITE_ITEM, FAVORITE_RESPONSE_DATA } from "@/types/favorite"
import { MEETING_ADD_CLIENT_VALUE, MEETING_UPDATE_CLIENT_VALUE, MEETING_DELETE_CLIENT_PARAMS } from "@/types/meeting"

import { MESSAGE_ROOM_RESPONSE } from "@/types/message"

interface MUTATIONS_INTER_FACE {
    successCallback : (isReload? : boolean) => void
    failCallback : (error : Error) => void
}

export const useUserInfoMutation = () => {

    const queryClient = useQueryClient();

    const queryKey = process["env"]["NEXT_PUBLIC_QUERY_KEY_USER_INFO"] as string;

    const { SetUserInfoQuery } = useUserInfoStore();

    function UpdateUserInfo({ successCallback, failCallback } : MUTATIONS_INTER_FACE) {
        return useMutation({
            mutationKey : [queryKey],
            mutationFn : (data : USER_FORM_VALUE) => API_USER_SET(data),
            async onSuccess(rs) {

                const data = rs["data"] as USER_INFO;

                SetUserInfoQuery(data)

                successCallback();
            },
            onError(error) {
                failCallback(error)
            },
        })
    }

    function InitUserInfo() {

        return useMutation({
            mutationFn : API_USER_GET,
            onSuccess(rs) {

                const data = rs["data"] as USER_INFO;

                queryClient.setQueryData([queryKey], data);

                SetUserInfoQuery(data)
            },
            onError(error) {
                console.log("user info init error",error)
            },
        })
    }

    return { UpdateUserInfo, InitUserInfo }
}

export const useFavoriteMutation = () => {

    const queryClient = useQueryClient();

    const queryKey = process["env"]["NEXT_PUBLIC_QUERY_KEY_FAVORITE"] as string;

    const { SetFavoriteQuery } = useUserInfoStore();
    
    function InitFavorite() {

        return useMutation({
            mutationFn : API_FAVORITE_LIST,
            onSuccess(rs) {

                const data = rs["data"] as FAVORITE_RESPONSE_DATA;
                
                queryClient.setQueryData([queryKey], data);

                SetFavoriteQuery(data);
            },
            onError(error) {
                console.log("favorite init error",error)
            },
        })
    }

    function AddFavorite() {
        return useMutation({
            mutationFn : (data : FAVORITE_ITEM) => API_FAVORITE_ADD(data),
            onSuccess(rs) {

                const data = rs["data"] as FAVORITE_RESPONSE_DATA;
                
                queryClient.setQueryData([queryKey], data);

                SetFavoriteQuery(data);
            },
            onError(error) {
                console.log("favorite add error",error)
            },
        })
    }

    function RemoveFavorite(){
        return useMutation({
            mutationFn : (data : string[]) => API_FAVORITE_REMOVE(data),
            onSuccess(rs) {

                const data = rs["data"] as FAVORITE_RESPONSE_DATA;

                queryClient.setQueryData([queryKey], data);

                SetFavoriteQuery(data);
                
            },
            onError(error) {
                console.log("favorite add error",error)
            },
        })
    }

    return { InitFavorite, AddFavorite, RemoveFavorite }
}

export const useMeetingMutation = () => {
    const queryClient = useQueryClient();

    const queryKey = process["env"]["NEXT_PUBLIC_QUERY_KEY_MEETING"] as string;

    const { SetPromiseQuery } = useUserInfoStore();

    function InitPromise() {
        return useMutation({
            mutationFn : API_MEETING_PROMISE,
            onSuccess(rs) {
                queryClient.setQueryData([queryKey,"promise"], rs["data"]);
            },
            onError(error) {
                console.log("promise init error",error)
            },
        })
    }

    function AddMeeting({ successCallback, failCallback } : MUTATIONS_INTER_FACE){
        return useMutation({
            mutationFn : (params : MEETING_ADD_CLIENT_VALUE) => API_MEETING_ADD(params),
            onSuccess(rs) {
                
                const { resultCode, data } = rs;

                if(0 > resultCode) return successCallback(true);
                
                queryClient.invalidateQueries({queryKey : [queryKey, "list"]});
                queryClient.setQueryData([queryKey,"promise"], data);

                SetPromiseQuery(data);
                
                successCallback();
            },
            onError(error) {
                console.log("AddMeeting error",error);
                failCallback(error);
            },
        })
    }

    function DeleteMeeting({ successCallback, failCallback } : MUTATIONS_INTER_FACE){
        return useMutation({
            mutationFn : async (params : MEETING_DELETE_CLIENT_PARAMS) =>  await API_MEETING_DELETE(params),
            onSuccess(rs) {

                const { resultCode, data } = rs;

                if(0 > resultCode) return successCallback(true);
                
                queryClient.invalidateQueries({queryKey : [queryKey, "list"]});

                queryClient.setQueryData([queryKey,"promise"], data);

                SetPromiseQuery(data);

                successCallback();
            },

            onError(error) {
                console.log("DeleteMeeting error",error);

                failCallback(error);
            },
        })
    }

    function UpdateMeeting({ successCallback, failCallback } : MUTATIONS_INTER_FACE){
        return useMutation({
            mutationFn : (params : MEETING_UPDATE_CLIENT_VALUE) => API_MEETING_UPDATE(params),
            onSuccess(rs) {
                const { resultCode, data } = rs;

                if(0 > resultCode) return successCallback(true);
                
                queryClient.invalidateQueries({queryKey : [queryKey, "list"]});
                queryClient.setQueryData([queryKey,"promise"], data);

                SetPromiseQuery(data);

                successCallback();
            },
            onError(error) {
                console.log("UpdateMeeting error",error);
                failCallback(error);
            },
        })
    }

    function AttendMeeting({ successCallback, failCallback } : MUTATIONS_INTER_FACE){
        return useMutation({
            mutationFn : (_id : string) => API_MEETING_ATTEND(_id),
            onSuccess(rs) {

                const { resultCode, data } = rs;

                if(0 > resultCode) return successCallback(true);

                queryClient.invalidateQueries({queryKey : [queryKey, "list"]});

                SetPromiseQuery(data);

                successCallback();
            },
            onError(error) {
                console.log("AttendMeeting error",error);
                failCallback(error)
            },
        })
    }

    function AttendCancelMeeting({ successCallback, failCallback } : MUTATIONS_INTER_FACE) {
        return useMutation({
            mutationFn : (_id : string) => API_MEETING_ATTEND_CANCEL(_id),
            onSuccess(rs) {
                const { resultCode, data } = rs;

                if(0 > resultCode) return successCallback(true);

                queryClient.invalidateQueries({queryKey : [queryKey, "list"]});

                SetPromiseQuery(data);

                successCallback();
            },
            onError(error) {
                console.log("AttendCancelMeeting error",error);
                failCallback(error)
            },
        })
    }

    return { InitPromise, AddMeeting, DeleteMeeting, UpdateMeeting, AttendMeeting, AttendCancelMeeting }
}

export const useMessageMutation = () => {

    const queryClient = useQueryClient();

    const queryKey = process["env"]["NEXT_PUBLIC_QUERY_KEY_MASSAGE"] as string;

    const { SetMessageQuery } = useUserInfoStore();

    function InitMessage(){
        return useMutation({
            mutationFn : API_MESSAGE_GET,
            onSuccess(rs) {
                
                const { data } = rs as MESSAGE_ROOM_RESPONSE

                queryClient.setQueryData([queryKey, "rooms"], data);
                
                if(data) SetMessageQuery(data)
            },
            onError(error) {
                console.log("InitMessage error",error)
            }
        })
    }

    return { InitMessage }
}