import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

export type MessageType = {
    id: number
    message: string
}
type DialogType = {
    idName: number
    dialogName: string
}
export type PostType = {
    id: number
    message: string
    likesCount: string
}
export type SidebarType = {}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    subscribe: (observer: () => void) => void
    getState: ()=> RootStateType
    dispatch:(action:ActionsTypes)=>void
}
const ADD_POST = "ADD-POST";
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof sendMessageAC>


export const addPostAC = (postText: string)=>{
    return{
        type:ADD_POST,
        postText:postText
    } as const
}

    export const changeNewTextAC = (newMessageBody:string) => {
    return{
        type:UPDATE_NEW_MESSAGE_BODY,
        newMessageBody:newMessageBody
    } as const
}

export const updateNewMessageTextAC = (newText:string) => {
    return {
        type: CHANGE_NEW_TEXT,
        newText: newText
    } as const
}

export const sendMessageAC = (sendMessage:string) => {
    return {
        type: SEND_MESSAGE,
        sendMessage: sendMessage
    } as const
}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: '4'},
                {id: 2, message: 'I learn in IT-INCUBATOR', likesCount: '10'},
                {id: 3, message: 'My message about me?', likesCount: '15'},
                {id: 4, message: 'My message about me?', likesCount: '17'},
            ],
            newPostText: ''
        },
        dialogPage: {
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
        },
        sidebar: {}
    },
    _onChange() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._onChange = observer
    },

    dispatch(action){

       this._state.profilePage = profileReducer(this._state.profilePage, action);
       this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
       this._state.sidebar = sidebarReducer(this._state.sidebar,action);

       this._onChange();

/*
        if(action.type ===ADD_POST){
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._onChange()
        } else if(action.type ===CHANGE_NEW_TEXT){
            this._state.profilePage.newPostText = action.newText
            this._onChange()
        } else if(action.type===UPDATE_NEW_MESSAGE_BODY){
            this._state.dialogPage.newMessageBody = action.newMessageBody
            this._onChange()
        } else if(action.type===SEND_MESSAGE) {
            const body: MessageType = {
                id: new Date().getTime(),
                message: action.sendMessage
            }
            this._state.dialogPage.messages.push(body)
            this._state.dialogPage.newMessageBody = '';
            this._onChange();
        }
*/
    }
}
export default store;