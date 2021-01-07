import {ActionsTypes, AppStateType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {FormAction, stopSubmit} from 'redux-form';
import {autchAPI} from '../API/auth-api';
import {securityAPI} from '../API/security-api';
import {ResultCodesEnum} from '../API/api';


const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

type DataType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
    captchaUrl: string | null,
}

export type AuthType = {
    data: DataType,
    messages: string[],
    resultCode: number,

}


let initialState: AuthType = {
    data: {
        id: null as number | null,
        login: null as string | null,
        email: null as string | null,
        isAuth: false,
        captchaUrl: null as string | null, // if null, then captcha is not required
    },
    messages: [],
    resultCode: 0
}

export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                }
            }
        }
        case 'GET-CAPTCHA-URL-SUCCESS':{
            return {
                ...state,
                data:{
                    ...state.data,
                    captchaUrl: action.payload.captchaUrl
                }
            }
        }
        default:
            return state;
    }
}


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {
            id,
            login,
            email,
            isAuth,
        }
    } as const
)


export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl
    }
} as const)


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes | FormAction>

export const authMeThunkCreator = (): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
    let response = await autchAPI.getMe()

    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const loginTC = (email: string, password: string, rememberMe: boolean,captchaUrl:string|null): ThunkType =>
    async (dispatch, getState: () => AppStateType) => {
        let response = await autchAPI.login(email, password, rememberMe,captchaUrl)
        if (response.resultCode === ResultCodesEnum.Success) {
            // success, get auth data
            dispatch(authMeThunkCreator());
            debugger
        } else {
            if (response.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                debugger
                dispatch(getCaptchaUrl())
            }
            let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch, getState: () => AppStateType) => {
        const response = await securityAPI.getCapchaUrl();
        const captchaUrl = response.url
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    }


export const logoutTC = (): ThunkType =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>, getState: () => AppStateType) => {
        let response = await autchAPI.logout()
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }

    }
