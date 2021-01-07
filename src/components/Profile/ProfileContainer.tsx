import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom'


import Profile from './Profile';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

import {
    getProfileProfileThunkCreator,
    getStatus,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profile-reducer';


type PathParamsType = {
    userId: string

}

type StateType = {}

type MapStatePropsType = {
    profile: ProfileType
    isAuth: boolean
    status: string | null
    authorizedUserId: number | null
}
type MapDispatchPropsType = {
    getProfileProfileThunkCreator: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string | null) => void
    savePhoto: (savePhoto: any) => void
    saveProfile: (prifile: ProfileType) => void

}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType

export type ProfilesPropsType = RouteComponentProps<PathParamsType> & OwnPropsType


const ProfileContainer = React.memo((props: ProfilesPropsType) => {

    console.log('Profile container Renderer');

    useEffect(() => {
        refreshProfile();

    }, [ props.match.params.userId,  props.profile.photos.small])
    // props.match.params.userId, props.profile.photos, props.status, props.authorizedUserId]

    const refreshProfile = () => {
        let userId = props.match.params.userId
        //const status = props.status;

        if (!userId) {
            userId = String(props.authorizedUserId)
            if (!userId) props.history.push('/login')
        }
        props.getProfileProfileThunkCreator(userId)
        props.getStatus(userId)
        //props.updateStatus(status)
    }


    return (
        <Profile {...props}
        />
    );
})

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.data.isAuth,
    status: state.profilePage.status,
    authorizedUserId: state.auth.data.id

})


export default compose<React.ComponentType<any>>(
    connect(mapStateToProps, {
        getProfileProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfile
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)