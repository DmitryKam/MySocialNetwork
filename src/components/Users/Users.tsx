import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import s from './Users.module.css'

type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void

}


function Users(props: UsersPropsType) {

    if(props.users.length ===0){
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
                followed: false,
                fullName: 'Dmitry',
                status: 'I Am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
                followed: true,
                fullName: 'Sasha',
                status: 'I Am a boss too',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 3,
                photoUrl: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
                followed: false,
                fullName: 'Andrew',
                status: 'I Am a boss too',
                location: {city: 'Minsk', country: 'Belarus'}
            },

        ]);
    }


    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl} className={s.userPhoto}/>
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
                     <div>{u.fullName}</div>
                     <div>{u.status}</div>
                 </span>
                 <span>
                     <div>{u.location.country}</div>
                     <div>{u.location.city}</div>
                 </span>
                </span>
                </div>)
            }
        </div>
    )
}

export default Users;