import {ActionsTypes} from './redux-store';

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
}

let initialState:DialogsPageType = {
        dialogs: [
            {idName: 1, dialogName: 'Dima'},
            {idName: 2, dialogName: 'Andi'},
            {idName: 3, dialogName: 'Peter'},
            {idName: 4, dialogName: 'Nik'},
            {idName: 5, dialogName: 'Slava'},
        ] as Array<DialogType>,
        messages: [
            {id: 1, message: 'Yo'},
            {id: 2, message: 'How is you?'},
            {id: 3, message: 'Bue'},
            {id: 4, message: 'Did you like a coffe?'},
            {id: 5, message: 'Hello'},
        ] as Array<MessageType>,
}

const dialogsReducer = (state=initialState, action:ActionsTypes):DialogsPageType => {


    switch (action.type) {

        case SEND_MESSAGE:
            const body: MessageType = {
                id: new Date().getTime(),
                message: action.sendMessage
            }
            return {
                ...state,
                messages:[...state.messages, body]
            }

        default:
            return state
    }
}


export const sendMessageAC = (sendMessage:string) => {
    return {
        type: SEND_MESSAGE,
        sendMessage: sendMessage
    } as const
}



export default dialogsReducer;