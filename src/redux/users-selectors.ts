import {createSelector} from 'reselect';

import {AppStateType} from './redux-store';
import {UserType} from './users-reducer';

const getUsersSelector = (state:AppStateType)=>{
 return state.usersPage.users;
}

export const getIsFetching = (state:AppStateType)=>{
 return state.usersPage.isFetching;
}

export const getUserSuper = createSelector<AppStateType,Array<UserType>,any>(getUsersSelector,(users)=>{
 return users.filter(u=>true);
})

export const pageSize = (state:AppStateType)=>{
 return state.usersPage.pageSize;
}

export const totalUsersCount = (state:AppStateType)=>{
 return state.usersPage.totalItemsCount;
}

export const currentPage = (state:AppStateType)=>{
 return state.usersPage.currentPage;
}


export const followingInProgress = (state:AppStateType)=>{
 return state.usersPage.followingInProgress;
}


