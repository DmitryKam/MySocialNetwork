import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {UsersType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

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
                        ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                withCredentials:true,
                                headers:{
                                    'API-KEY':'7cf28f0f-b2dc-4778-845d-a74e6bc104bc'
                                }
                            }
                        )
                                .then(response => {
                                    if(response.data.resultCode==0){
                                        props.unFollow(u.id)
                                    }
                                });
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},{
                                withCredentials:true,
                                headers:{
                                    'API-KEY':'7cf28f0f-b2dc-4778-845d-a74e6bc104bc'
                                }
                            })
                                .then(response => {
                                   if(response.data.resultCode==0){
                                       props.follow(u.id)
                                   }
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