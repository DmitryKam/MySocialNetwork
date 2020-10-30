import {ActionsTypes} from './redux-store';


const SET_USER_DATA = 'SET_USER_DATA';


type DataType = {
    id: number | null,
    login: number | null,
    email: number | null,
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
        isAuth: true,
    },
    messages: [],
    resultCode: 0
}

export const authReducer = (state: AuthType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.data,
                isAuth: true
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