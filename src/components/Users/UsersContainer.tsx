import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../redux/redux-store';
import {ActionsTypes} from '../../redux/store';
import {
    setCurrentPageAC,
    followAC,
    setUsersAC,
    unFollowAC,
    UsersType,
    setTotalUsersCountAC
} from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';

type UsersAPIPropsType = {
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

class UsersComponent extends React.Component<UsersAPIPropsType> {

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

        return <Users
            totalUsersCount={this.props.totalUsersCount}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
        />

    }

}


let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        },
        setCurrentPage:(currentPage:number)=>{
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount:number)=>{
            dispatch(setTotalUsersCountAC(totalCount))
        }

    }
}




    const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersComponent)

    export default UsersContainer;