import {stopSubmit} from 'redux-form';

import {ActionsTypes, AppStateType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {profileAPI} from '../API/profile-api';
import {usersAPI} from '../API/user-api';
import {ResultCodesEnum} from '../API/api';


const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_PHOTO_SUCCESS = 'SET-PHOTO-SUCCESS';


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

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
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
        aboutMe: '',
        contacts: {
            facebook: '',
            github: '',
            instagram: '',
            mainLink: '',
            twitter: '',
            vk: '',
            website: '',
            youtube: '',
        },
        photos: {
            large: null,
            small: null,
        },
        fullName: '',
        lookingForAJob: false,
        lookingForAJobDescription: '',
        userId: 0
    },
    status: null
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: '0'
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case 'DELETE-POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)

            }
        case 'SET_USERS_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SET-PHOTO-SUCCESS': {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
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

export const deletePostAC = (id: number) => {
    return {
        type: DELETE_POST,
        id
    } as const
}

export const setPhotoSuccess = (photos: any) => {
    return {
        type: SET_PHOTO_SUCCESS,
        photos
    } as const
}


export const setUsersProfile = (profile: ProfileType) => {
    return {
        type: SET_USERS_PROFILE,
        profile

    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        status
    } as const
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>


export const getProfileProfileThunkCreator = (userId: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUsersProfile(response));

    }


export const getStatus = (userId: string | null): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
    let response = await profileAPI.getStatus(userId)

    dispatch(setStatus(response))

}

export const updateStatus = (status: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {

   try{
       const response = await profileAPI.updateStatus(status)

       if (response.resultCode === ResultCodesEnum.Success) {
           dispatch(setStatus(status))
       }
   }catch (e) {
        console.log(e)
   }

}

export const savePhoto = (photoFile: File): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
    const data = await profileAPI.savePhoto(photoFile)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setPhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, any>, getState: () => AppStateType) => {
    const userId = getState().auth.data.id
        debugger;
        const response = await profileAPI.saveProfile({...profile})
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(getProfileProfileThunkCreator(String(userId)))
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('edit-profile', {_error: message}))
            return Promise.reject(response.data.messages[0]);
        }
    }


export default profileReducer;