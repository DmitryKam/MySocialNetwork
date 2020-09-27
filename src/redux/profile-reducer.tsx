import {ActionsTypes, PostType, ProfilePageType} from './state';

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';


export const addPostAC = (postText: string)=>{
    return{
        type:ADD_POST,
        postText:postText
    } as const
}

export const updateNewMessageTextAC = (newText:string) => {
    return {
        type: CHANGE_NEW_TEXT,
        newText: newText
    } as const
}

const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case CHANGE_NEW_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }

}



export default profileReducer;