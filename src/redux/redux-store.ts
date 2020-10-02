import {combineReducers, createStore} from 'redux';
import profileReducer, { ProfilePageType } from './profile-reducer';
import dialogsReducer, {DialogsPageType} from './dialogs-reducer';
import sidebarReducer, {SidebarType} from './sidebar-reducer';






let reducers = combineReducers({
    profilePage:profileReducer,
    dialogPage:dialogsReducer,
    sidebar:sidebarReducer
});

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers);

export type StoreReduxType = typeof store



export default store;