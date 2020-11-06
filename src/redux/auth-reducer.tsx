import {ActionsTypes, RootState} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {autchAPI} from '../API/api';


const SET_USER_DATA = 'SET_USER_DATA';


type DataType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

export type AuthType = {
    data: DataType,
    messages: string[],
    resultCode: number,

}


let initialState: AuthType = {
    data: {
        id: null,
        login: null,
        email: null,
        isAuth: false,
    },
    messages: [],
    resultCode: 0
}

export const authReducer = (state: AuthType = initialState, action: ActionsTypes):AuthType => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                data: {
                    ...state.data, ...action.data,
                    isAuth: true}

            }
        }
        default:
            return state;

    }
}


export const setAuthUserData = (id: number | null, email: string, login: string) => ({
        type: SET_USER_DATA,
        data: {
            id,
            login,
            email
        }
    } as const
)


type ThunkType = ThunkAction<void, RootState, unknown, ActionsTypes>

export const authMeThunkCreator = ():ThunkType => {
    return (dispatch:ThunkDispatch<RootState,unknown,ActionsTypes>,getState: ()=>RootState)=>{
        autchAPI.getMe()
            .then(data => {
                debugger
                if (data.resultCode===0){
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            })
    }
}