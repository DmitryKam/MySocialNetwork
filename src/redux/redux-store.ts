import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer, {addPostAC, deletePostAC, setPhotoSuccess, setStatus, setUsersProfile} from './profile-reducer';
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
import {authReducer, getCaptchaUrlSuccess, setAuthUserData} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer, stopSubmit} from 'redux-form';
import {appReducer, initializedSuccessAC} from './app-reducer';


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
    | ReturnType<typeof initializedSuccessAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof setPhotoSuccess>
    | ReturnType<typeof getCaptchaUrlSuccess>


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    form: formReducer,
    app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store


export type RootState = ReturnType<typeof reducers>

export type StoreReduxType = typeof store
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;

