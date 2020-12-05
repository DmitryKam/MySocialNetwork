import {ActionsTypes, RootState} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {profileAPI, usersAPI} from '../API/api';

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET-STATUS';


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
    small: string | null
    large: string | null
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
    profile: ProfileType
    status: string | null
}
let initialState: ProfilePageType = {
     posts: [
         {id: 1, message: 'Hi, how are you?', likesCount: '4'},
         {id: 2, message: 'I learn in IT-INCUBATOR', likesCount: '10'},
         {id: 3, message: 'My message about me?', likesCount: '15'},
         {id: 4, message: 'My message about me?', likesCount: '17'},
     ] as Array<PostType>,
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
    },
     status: null
}

const profileReducer = (state = initialState, action: ActionsTypes):ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            return  {
                ...state,
                posts: [...state.posts, newPost]
            }

        case 'SET_USERS_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case'SET-STATUS':{
            return {
                ...state,
                status: action.status
            }
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

export const setUsersProfile = (profile:any) => {
    return {
        type: SET_USERS_PROFILE,
        profile

    } as const
}

export const setStatus = (status:string)=>{
   return{
       type: SET_STATUS,
       status
   } as const
}

type ThunkType = ThunkAction<void, RootState, unknown, ActionsTypes>

export const getProfileProfileThunkCreator = (userId: string):ThunkType =>{
    return (dispatch:ThunkDispatch<RootState,unknown,ActionsTypes>,getState: ()=>RootState)=>{
        usersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUsersProfile(data));
            })
    }
}

export const getStatus = (userId: string):ThunkType =>(dispatch:ThunkDispatch<RootState, unknown, ActionsTypes>,getState:()=>RootState) =>{
    profileAPI.getStatus(userId)
        .then(response =>{
            dispatch(setStatus(response.data))
        });
}

export const updateStatus = (status:string):ThunkType =>(dispatch:ThunkDispatch<RootState, unknown, ActionsTypes>,getState:()=>RootState) =>{
    profileAPI.updateStatus(status)
        .then(response =>{
            if(response.data.resultCode === 0){
            dispatch(setStatus(status))
        }
        });
}



export default profileReducer;