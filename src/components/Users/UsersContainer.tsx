import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {RootState} from '../../redux/redux-store';
import {ActionsTypes} from '../../redux/store';
import {followAC, setUsersAC, unFollowAC, UsersType} from '../../redux/users-reducer';


let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users
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
        }
    }
}


    const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)

    export default UsersContainer;