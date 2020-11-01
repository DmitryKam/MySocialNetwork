import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {UsersType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../API/api';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p:number)=>void
    users: UsersType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    toggleIsFollowingProgress: (followingInProgress: boolean,id: number) => void
    followingInProgress:number[]
}


let Users = (props:UsersPropsType)=> {

    let pagesCount =Math.ceil(props.totalUsersCount/props.pageSize);
    let pages = [];

    for (let i=1; i<= pagesCount;i++){
        pages.push(i);
    }

    return(<div>
        <div>
            {pages.map(p=>{
                return(
                    <span key={p}
                        onClick={(e)=>props.onPageChanged(p)}
                        className={props.currentPage === p ? s.selectedPage : ''}
                    >{p}
                    </span>
                )})}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                        <span>
                <div>
                    <NavLink to={'/profile/'+ u.id}>
                    <img src={u.photos.small != null
                            ? u.photos.small
                            : userPhoto}
                        className={s.userPhoto}/>
                        </NavLink>
                </div>
                <div>
                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id=>id ===u.id)} onClick={() => {
                            props.toggleIsFollowingProgress(true,u.id);
                            usersAPI.deleteFollow(u.id)
                                .then(data => {
                                    if(data.resultCode==0){
                                        props.unFollow(u.id)
                                    }
                                    props.toggleIsFollowingProgress(false,u.id);
                                });
                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id=>id ===u.id)} onClick={() => {
                            props.toggleIsFollowingProgress(true,u.id);
                            usersAPI.postFollow(u.id)
                                .then(data => {
                                   if(data.resultCode==0){
                                       props.follow(u.id)
                                   }
                                    props.toggleIsFollowingProgress(false,u.id);
                                });
                        }}> Follow</button>
                    }
                </div>
            </span>
                <span>
                 <span>
                     <div>{u.name}</div>
                     <div>{u.status}</div>
                 </span>
                 <span>
                     <div>{'u.location.country'}</div>
                     <div>{'u.location.city'}</div>
                 </span>
                </span>
            </div>)
        }
    </div>)
}

export default Users;