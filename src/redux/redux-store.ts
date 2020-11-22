import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {addPostAC, setStatus, setUsersProfile} from './profile-reducer';
import dialogsReducer, {sendMessageAC} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFetching, toggleIsFollowingProgress,
    unFollowSuccess
} from './users-reducer';
import {authReducer, setAuthUserData} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';


export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleisFetching>
    | ReturnType<typeof setUsersProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleIsFollowingProgress>
    | ReturnType<typeof setStatus>


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    form: formReducer,
});

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type StoreReduxType = typeof store


export default store;
// @ts-ignore
window.store = store