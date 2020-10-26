import {ActionsTypes} from './redux-store';

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';


export type PostType = {
    id: number
    message: string
    likesCount: string
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PhotosType = {   // Dublicte from users-reducer
    small: string
    large: string
}

export type ProfileType = {
    aboutMe:string
    contacts: ContactsType
    lookingForAJob:boolean
    lookingForAJobDescription:string
    fullName:string
    userId: number
    photos: PhotosType
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType
}
let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: '4'},
        {id: 2, message: 'I learn in IT-INCUBATOR', likesCount: '10'},
        {id: 3, message: 'My message about me?', likesCount: '15'},
        {id: 4, message: 'My message about me?', likesCount: '17'},
    ],
    newPostText: '',
    profile: {
        aboutMe:'',
        contacts: {
            facebook:'',
            github:'',
            instagram:'',
            mainLink:'',
            twitter:'',
            vk:'',
            website:'',
            youtube:'',
        },
        photos:{
            large:'',
            small:'',
        },
        fullName:'',
        lookingForAJob: false,
        lookingForAJobDescription:'',
        userId:0
    }
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
        case 'SET_USERS_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }

}


export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}

export const updateNewMessageTextAC = (newText: string) => {
    return {
        type: CHANGE_NEW_TEXT,
        newText
    } as const
}

export const setUsersProfile = (profile:any) => {
    return {
        type: SET_USERS_PROFILE,
        profile

    } as const
}



export default profileReducer;