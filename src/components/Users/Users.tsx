import React from 'react';
import {UsersPageType, UsersType} from '../../redux/users-reducer';
import s from './Users.module.css';
import axios from 'axios';
import userPhoto from '../../assets/images/user.png';



type UsersPropsType = {
    users: UsersType[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage:number)=>void
    setTotalUsersCount:(totalCount:number)=>void
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

class Users extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                debugger;
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
    })

    }
    onPageChanged = (pageNumber:number)=>{
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                debugger;
                this.props.setUsers(response.data.items);
            })

    }

    render() {

        let pagesCount =Math.ceil(this.props.totalUsersCount/this.props.pageSize);
        let pages = [];

        for (let i=1; i<= pagesCount;i++){
            pages.push(i);
        }
        return (
            <div>
                <div>
                    {pages.map(p=>{
                        return(
                        <span onClick={(e)=>this.onPageChanged(p)} className={this.props.currentPage === p ? s.selectedPage : ''}>{p}</span>
                        )})}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                        <span>
                <div>
                    <img
                        src={u.photos.small != null
                            ? u.photos.small
                            : userPhoto}
                        className={s.userPhoto}/>
                </div>
                <div>
                    {u.followed
                        ? <button onClick={() => {
                            this.props.unFollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            this.props.follow(u.id)
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
            </div>
        )
    }


}

export default Users;