import React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {RootState} from '../../redux/redux-store';
import {
    setCurrentPage,
    followSuccess,
    unFollowSuccess,
    UsersType,
    toggleIsFollowingProgress,
    getUsersThunkCreater, deleteFollowThunkCreater, toggleFollowingThunkCreater
}
    from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

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
        this.props.getUsersThunkCreater(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreater(pageNumber, this.props.pageSize);
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
            {/*<Preloader/>*/}
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

const AuthRedirectComponent = withAuthRedirect(UsersComponent)

const UsersContainer = connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {
    follow: followSuccess, unFollow: unFollowSuccess, setCurrentPage,
    toggleIsFollowingProgress, getUsersThunkCreater, deleteFollowThunkCreater,
    toggleFollowingThunkCreater,
})(AuthRedirectComponent)




export default UsersContainer;