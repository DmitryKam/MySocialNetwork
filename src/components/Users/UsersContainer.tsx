import React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {RootState} from '../../redux/redux-store';
import {
    setCurrentPage,
    follow,
    setUsers,
    unFollow,
    UsersType,
    setTotalUsersCount, toggleisFetching, toggleIsFollowingProgress
} from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {usersAPI} from '../../API/api';

type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress:number[]
}

type mapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleisFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (followingInProgress: boolean,id: number) => void

}


type PropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class UsersComponent extends React.Component<PropsType, StateType> {

    componentDidMount(): void {
        this.props.toggleisFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleisFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount)
        })

    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleisFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleisFetching(false);
            this.props.setUsers(data.items);
        })
    }

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
            <Preloader/>
        </>

    }

}


let mapStateToProps = (state: RootState): mapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}


const UsersContainer = connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleisFetching,
    toggleIsFollowingProgress

})(UsersComponent)

export default UsersContainer;