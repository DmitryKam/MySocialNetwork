import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {UsersType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import Paginator from '../../common/Paginator/Paginator';


type UsersPropsType = {
    user:any
    followingInProgress: number[],
    deleteFollowThunkCreater: (id: number) => void
    toggleFollowingThunkCreater: (id: number) => void

}


const User = (props: UsersPropsType) => {
            let user = props.user;

    return (<div>
                        <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null
                        ? user.photos.small
                        : userPhoto}
                         className={s.userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.deleteFollowThunkCreater(user.id)

                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {

                            props.toggleFollowingThunkCreater(user.id)

                        }}> Follow</button>
                    }
                </div>
            </span>
                <span>
                 <span>
                     <div>{user.name}</div>
                     <div>{user.status}</div>
                 </span>
                 <span>
                     <div>{'u.location.country'}</div>
                     <div>{'u.location.city'}</div>
                 </span>
                </span>

    </div>)
}

export default User;