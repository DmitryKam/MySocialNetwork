import profileReducer, {addPostAC, updateNewMessageTextAC} from './profile-reducer';
import dialogsReducer, {changeNewTextAC, sendMessageAC} from './dialogs-reducer';
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


export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof sendMessageAC>




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

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._onChange();
    }
}

export default store;