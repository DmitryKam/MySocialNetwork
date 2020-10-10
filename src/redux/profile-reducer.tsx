import {ActionsTypes} from './store';

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';


export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}

export const updateNewMessageTextAC = (newText: string) => {
    return {
        type: CHANGE_NEW_TEXT,
        newText: newText
    } as const
}

export type PostType = {
    id: number
    message: string
    likesCount: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: '4'},
        {id: 2, message: 'I learn in IT-INCUBATOR', likesCount: '10'},
        {id: 3, message: 'My message about me?', likesCount: '15'},
        {id: 4, message: 'My message about me?', likesCount: '17'},
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            return  {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }

        case CHANGE_NEW_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return state;
    }

}


export default profileReducer;