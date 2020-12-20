import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import Paginator from '../../common/Paginator/Paginator';
import User from './User';


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: UsersType[]
    followingInProgress: number[],
    deleteFollowThunkCreater: (id: number) => void
    toggleFollowingThunkCreater: (id: number) => void

}


const Users = (props: UsersPropsType) => {


    return (<div>
        <Paginator
            onPageChanged={props.onPageChanged}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            totalUsersCount={props.totalUsersCount}
        />
        <div>
        {
            props.users.map(u => <User
                key={u.id} user={u}
                    {...props}
                />)
        }</div>
    </div>)
}

export default Users;