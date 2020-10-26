import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {UsersType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p:number)=>void
    users: UsersType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
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
                    <span
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
                        ? <button onClick={() => {
                            props.unFollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
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