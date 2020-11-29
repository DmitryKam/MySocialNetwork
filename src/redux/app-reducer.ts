import {ActionsTypes, RootState} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {autchAPI} from '../API/api';
import {FormAction,} from 'redux-form';
import {type} from 'os';
import {authMeThunkCreator} from './auth-reducer';


const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';


type DataType = {}

export type InitializedType = {
    initialized: boolean

}


let initialState: InitializedType = {
    initialized: false
}

export const appReducer = (state: InitializedType = initialState, action: ActionsTypes): InitializedType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS': {
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
    } as const
)


export const initializedAppTC = () => (dispatch: ThunkDispatch<RootState, unknown, ActionsTypes>) => {
    let promise = dispatch(authMeThunkCreator());


    Promise.all([promise])
        .then((res) => {
            dispatch(initializedSuccessAC())
        })
}

