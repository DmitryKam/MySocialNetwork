import {ActionsTypes, DialogsPageType, MessageType} from './state';

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";


const dialogsReducer = (state:DialogsPageType, action:ActionsTypes) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newMessageBody;
            return state;
        case SEND_MESSAGE:
            const body: MessageType = {
                id: new Date().getTime(),
                message: action.sendMessage
            }
            state.messages.push(body)
            state.newMessageBody = '';
            return state
        default:
            return state
    }
}



export default dialogsReducer;