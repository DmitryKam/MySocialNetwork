import {ActionsTypes, RootState} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {autchAPI} from '../API/api';
import {FormAction, stopSubmit} from 'redux-form';
import {type} from 'os';


const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

type DataType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
    //captchaUrl:string | null,
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
        //captchaUrl: null as string | null,
    },
    messages: [],
    resultCode: 0
}

export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                data: {
                    ...action.payload,
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
            isAuth
        }
    } as const
)


// export const getCaptchaUrlSuccess = (captchaUrl:string) =>({
//     type:GET_CAPTCHA_URL_SUCCESS,
//     payload:{
//         captchaUrl
//     }
// })




type ThunkType = ThunkAction<void, RootState, unknown, ActionsTypes | FormAction>

export const authMeThunkCreator = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, getState: () => RootState) => {
       return autchAPI.getMe()
            .then(response => {
                if (response.resultCode === 0) {
                    let {id, email, login} = response.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
    }
}


export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return (dispatch, getState: () => RootState) => {


        autchAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(authMeThunkCreator());
                } else {
                    let message = response.messages.length > 0 ? response.messages[0] : "Some error"
                    dispatch(stopSubmit('login',{_error:message}))
                }
            })
    }
}

export const logoutTC = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>, getState: () => RootState) => {

        autchAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            })
    }
}