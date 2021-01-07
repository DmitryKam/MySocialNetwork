import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { UserType } from '../../redux/users-reducer';


type UsersPropsType = {
    user: UserType
    followingInProgress: number[],
    deleteFollowThunkCreater: (id: number) => void
    toggleFollowingThunkCreater: (id: number) => void
}


const User: React.FC<UsersPropsType> = React.memo( ({ user, followingInProgress, deleteFollowThunkCreater, toggleFollowingThunkCreater }) => {

    return (<div>
        <span>
                <div>
                    <NavLink to={ '/profile/' + user.id }>
                    <img src={ user.photos.small != null ? user.photos.small : userPhoto }
                         className={ s.userPhoto } alt={ "user" }/>
                    </NavLink>
                </div>
                <div>
                    { user.followed
                        ? <button disabled={ followingInProgress.some(id => id === user.id) } onClick={ () => {
                            deleteFollowThunkCreater(user.id)
                        }}> Unfollow </button>

                        : <button disabled={ followingInProgress.some(id => id === user.id) } onClick={() => {
                            toggleFollowingThunkCreater(user.id)
                        }}> Follow </button>
                    }
                </div>
            </span>
        <span>
                 <span>
                     <div>{ user.name }</div>
                     <div>{ user.status }</div>
                 </span>
                 <span>
                     <div>{ 'u.location.country' } </div>
                     <div>{ 'u.location.city' } </div>
                 </span>
                </span>
    </div>)
})

export default User;