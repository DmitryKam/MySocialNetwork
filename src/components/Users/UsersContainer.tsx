import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {RootState} from '../../redux/redux-store';
import {ActionsTypes} from '../../redux/store';
import {
    setCurrentPageAC,
    followAC,
    setUsersAC,
    unFollowAC,
    UsersType,
    setTotalUsersCountAC
} from '../../redux/users-reducer';


let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {

    return {
        follow: (userId: number) => {
            dispatch(followAC(userId));
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId));
        },
        setUsers: (users:UsersType[])=>{
            dispatch(setUsersAC(users))
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount:number)=>{
            dispatch(setTotalUsersCountAC(totalCount))
        }

    }
}


    const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)

    export default UsersContainer;