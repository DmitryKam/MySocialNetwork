import {ActionsTypes} from './store';

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export type DialogType = {
    idName: number
    dialogName: string
}
export type MessageType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}

let initialState:DialogsPageType = {
        dialogs: [
            {idName: 1, dialogName: 'Dima'},
            {idName: 2, dialogName: 'Andi'},
            {idName: 3, dialogName: 'Peter'},
            {idName: 4, dialogName: 'Nik'},
            {idName: 5, dialogName: 'Slava'},
        ],
        messages: [
            {id: 1, message: 'Yo'},
            {id: 2, message: 'How is you?'},
            {id: 3, message: 'Bue'},
            {id: 4, message: 'Did you like a coffe?'},
            {id: 5, message: 'Hello'},
        ],
        newMessageBody: ''
}

const dialogsReducer = (state=initialState, action:ActionsTypes) => {

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

export const changeNewTextAC = (newMessageBody:string) => {
    return{
        type:UPDATE_NEW_MESSAGE_BODY,
        newMessageBody:newMessageBody
    } as const
}

export const sendMessageAC = (sendMessage:string) => {
    return {
        type: SEND_MESSAGE,
        sendMessage: sendMessage
    } as const
}



export default dialogsReducer;