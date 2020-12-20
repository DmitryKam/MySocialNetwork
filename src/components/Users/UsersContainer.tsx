import React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../redux/redux-store';
import {
    setCurrentPage,
    followSuccess,
    unFollowSuccess,
    UsersType,
    toggleIsFollowingProgress,
    requestUsersThunkCreater, deleteFollowThunkCreater, toggleFollowingThunkCreater
}
    from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    currentPage,
    followingInProgress,
    getUsers,
    getIsFetching,
    pageSize,
    totalUsersCount
} from '../../redux/users-selectors';

type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type mapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (followingInProgress: boolean, id: number) => void
    getUsersThunkCreater: (currentPage: any, pageSize: any) => void
    deleteFollowThunkCreater:(id:number)=>void
    toggleFollowingThunkCreater:(id:number)=>void

}


export type UsersPropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class UsersComponent extends React.Component<UsersPropsType, StateType> {

    componentDidMount(): void {
        const {currentPage,pageSize} = this.props
        this.props.getUsersThunkCreater(currentPage, pageSize);

    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize}= this.props
        this.props.getUsersThunkCreater(pageNumber, pageSize);
    }


    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : null}
            <Users
                {...this.props}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                deleteFollowThunkCreater={this.props.deleteFollowThunkCreater}
                toggleFollowingThunkCreater={this.props.toggleFollowingThunkCreater}
            />
        </>

    }

}


let mapStateToProps = (state: RootState): mapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: followingInProgress(state),
    }
}


export default compose(
    connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {
        follow: followSuccess, unFollow: unFollowSuccess, setCurrentPage,
        toggleIsFollowingProgress, getUsersThunkCreater: requestUsersThunkCreater, deleteFollowThunkCreater,
        toggleFollowingThunkCreater})
    ) (UsersComponent);