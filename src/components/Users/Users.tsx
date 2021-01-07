import React from 'react';

import { UserType } from '../../redux/users-reducer';
import Paginator from '../../common/Paginator/Paginator';
import User from './User';


type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: UserType[]
    followingInProgress: number[],
    deleteFollowThunkCreater: (id: number) => void
    toggleFollowingThunkCreater: (id: number) => void

}


const Users:React.FC<UsersPropsType> = React.memo(({currentPage,totalItemsCount, pageSize, onPageChanged,users,followingInProgress,deleteFollowThunkCreater,toggleFollowingThunkCreater,...props}) => {

    return (<div>
        <Paginator
            onPageChanged={ onPageChanged }
            pageSize={ pageSize }
            currentPage={ currentPage }
            totalItemsCount={ totalItemsCount }
        />
        <div>
        {
            users.map(u => <User
                key={ u.id } user={ u }
                followingInProgress={followingInProgress}
                toggleFollowingThunkCreater={toggleFollowingThunkCreater}
                deleteFollowThunkCreater={deleteFollowThunkCreater}
            />)
        }</div>
    </div>)
})

export default Users;