import {createSelector, OutputSelector} from 'reselect';
import {RootState} from './redux-store';
import {UsersType} from './users-reducer';

export const getUsers = (state:RootState)=>{
 return state.usersPage.users;
}

export const getIsFetching = (state:RootState)=>{
 return state.usersPage.isFetching;
}

export const getUserSuper = createSelector<RootState,Array<UsersType>,any>(getUsers,(users)=>{
 return users.filter(u=>true);
})

export const pageSize = (state:RootState)=>{
 return state.usersPage.pageSize;
}

export const totalUsersCount = (state:RootState)=>{
 return state.usersPage.totalUsersCount;
}

export const currentPage = (state:RootState)=>{
 return state.usersPage.currentPage;
}



export const followingInProgress = (state:RootState)=>{
 return state.usersPage.followingInProgress;
}


