import {ActionsTypes, AppStateType} from './redux-store';
import {ThunkDispatch} from 'redux-thunk';
import {authMeThunkCreator} from './auth-reducer';


const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED-SUCCESS';


export type InitializedType = typeof initialState


const initialState = {
    initialized: false
}

export const appReducer = (state: InitializedType = initialState, action: ActionsTypes): InitializedType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED-SUCCESS': {
            return {
                ...state,
                initialized: action.payload.initialized
            }
        }
        default:
            return state;

    }
}



export const initializedSuccessAC = (initialized: boolean = true) => ({
        type: INITIALIZED_SUCCESS,
        payload: {
            initialized
        }
} as const)


export const initializedAppTC = () => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
    let promise = dispatch(authMeThunkCreator());

    Promise.all([promise])
        .then((res) => {
            dispatch(initializedSuccessAC())
        })
}

