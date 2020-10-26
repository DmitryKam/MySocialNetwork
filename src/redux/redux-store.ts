import {combineReducers, createStore} from 'redux';
import profileReducer, {addPostAC,setUsersProfile, updateNewMessageTextAC} from './profile-reducer';
import dialogsReducer, {changeNewTextAC, sendMessageAC} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer, {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleisFetching,
    unFollow
} from './users-reducer';


export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleisFetching>
    | ReturnType<typeof setUsersProfile>





let reducers = combineReducers({
    profilePage:profileReducer,
    dialogPage:dialogsReducer,
    usersPage: usersReducer,
    sidebar:sidebarReducer
});

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers);

export type StoreReduxType = typeof store



export default store;