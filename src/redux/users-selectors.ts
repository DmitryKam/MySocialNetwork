import {RootState} from './redux-store';

export const getUsers = (state:RootState)=>{
 return state.usersPage.users;
}

export const pageSize = (state:RootState)=>{
 return state.usersPage.pageSize;
}

export const totalUsersCount = (state:RootState)=>{
 return state.usersPage.totalUsersCount;
}

export const currentPage = (state:RootState)=>{
 return state.usersPage.currentPage;
}

export const isFetching = (state:RootState)=>{
 return state.usersPage.isFetching;
}

export const followingInProgress = (state:RootState)=>{
 return state.usersPage.followingInProgress;
}


