import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {AppStateType} from '../../redux/redux-store';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {
    currentPage,
    followingInProgress,
    getIsFetching, getUserSuper,
    pageSize,
    totalUsersCount
} from '../../redux/users-selectors';
import {
    deleteFollowThunkCreater,
    followSuccess,
    requestUsersThunkCreater,
    setCurrentPage,
    toggleFollowingThunkCreater,
    toggleIsFollowingProgress,
    unFollowSuccess,
    UserType
} from '../../redux/users-reducer';


type mapStatePropsType = {
    users: UserType[]
    pageSize: number
    totalItemsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type mapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFollowingProgress: (followingInProgress: boolean, id: number) => void
    getUsersThunkCreater: (currentPage: number, pageSize: number) => void
    deleteFollowThunkCreater: (id: number) => void
    toggleFollowingThunkCreater: (id: number) => void

}

type OwnPropsType = {
    pageTitle: string
}

export type UsersPropsType =  mapStatePropsType & mapDispatchPropsType & OwnPropsType

const UsersComponent: React.FC<UsersPropsType> = React.memo(({...props}) => {

    useEffect(() => {

        props.getUsersThunkCreater(props.currentPage, props.pageSize)

    }, [])


    const onPageChanged = (pageNumber: number) => {

        props.getUsersThunkCreater(pageNumber, props.pageSize);
    }

    return <>

        {props.isFetching ? <Preloader/> : null}

        <Users
            {...props}
            totalItemsCount={props.totalItemsCount}
            currentPage={props.currentPage}
            pageSize={props.pageSize}
            onPageChanged={onPageChanged}
            users={props.users}
            followingInProgress={props.followingInProgress}
            deleteFollowThunkCreater={props.deleteFollowThunkCreater}
            toggleFollowingThunkCreater={props.toggleFollowingThunkCreater}
        />
    </>

})


const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: getUserSuper(state),
        pageSize: pageSize(state),
        totalItemsCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: followingInProgress(state),
    }
}


export default compose<React.ComponentType>(
    connect<mapStatePropsType, mapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        follow: followSuccess,
        unFollow: unFollowSuccess,
        getUsersThunkCreater: requestUsersThunkCreater,
        setCurrentPage,
        toggleIsFollowingProgress,
        deleteFollowThunkCreater,
        toggleFollowingThunkCreater
    }))(UsersComponent);