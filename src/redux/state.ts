import {ChangeEvent} from 'react';


type MessageType = {
    id: number
    message: string
}
type DialodType = {
    idName: number
    dialogName: string
}
type PostType = {
    id: number
    message: string
    likesCount: string
}
type SidebarType = {}
type ProflePageType = {
    posts: Array<PostType>
    newPostText: string
}
type DialodsPageType = {
    dialogs: Array<DialodType>
    messages: Array<MessageType>
}
export type RootStateType = {
    profilePage: ProflePageType
    dialogPage: DialodsPageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
/*    updateNewPostText: (newText:string) => void*/
/*    addPost: () => void*/
    _onChange: () => void
    subscribe: (observer: () => void) => void
    getState: ()=> RootStateType
    dispatch:(action:ActionsTypes)=>void
}


export type ActionsTypes = ReturnType<typeof addPostAC>|ReturnType<typeof changeNewTextAC>

export const addPostAC = (postText: string)=>{
    return{
        type:"ADD-POST",
        postText:postText
    } as const
}

    export const changeNewTextAC = (newText:string) => {
    return{
        type:"CHANGE-NEW-TEXT",
        newText:newText
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
            newPostText: 'Write tour Message'
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
            ]
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
/*
    addPost() {
        const newPost: PostType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: '0'
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._onChange()
    },*/
 /*  updateNewPostText(newText:string) {
        this._state.profilePage.newPostText = newText
        this._onChange()
    },*/
    dispatch(action){
        if(action.type ==="ADD-POST"){
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._onChange()
        } else if(action.type ==="CHANGE-NEW-TEXT"){
            this._state.profilePage.newPostText = action.newText
            this._onChange()
        }
    }


}

export default store;