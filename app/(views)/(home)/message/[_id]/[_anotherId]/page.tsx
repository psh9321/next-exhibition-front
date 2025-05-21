

import { getToken } from "@/util/token"

import { API_SERVER_MESSAGE_GET_ANOTHER } from "@/api/message.server"

import { USER_RECIVER  } from "@/types/message"
import MessageRoomView from "./_view"

interface MESSAGE_ROOM_PARAMS {
    params : {
        _id : string,
        _anotherId : string
    }
}

const MessageRoomPage =  async ({ params } : MESSAGE_ROOM_PARAMS) => {

    const token = await getToken();

    if(!token) return <></>
    
    const { _anotherId } = params;

    const { data } = await API_SERVER_MESSAGE_GET_ANOTHER(token, _anotherId);
    
    return (
        <MessageRoomView anotherIdKey={_anotherId} anotherData={data as USER_RECIVER} />
    )
}

export default MessageRoomPage