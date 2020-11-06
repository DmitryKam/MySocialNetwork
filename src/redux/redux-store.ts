import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {addPostAC, setUsersProfile, updateNewMessageTextAC} from './profile-reducer';
import dialogsReducer, {changeNewTextAC, sendMessageAC} from './dialogs-reducer';
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
import thunkMiddleware from 'redux-thunk'


export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
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


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    sidebar: sidebarReducer
});

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type StoreReduxType = typeof store


export default store;
// @ts-ignore
window.store = store