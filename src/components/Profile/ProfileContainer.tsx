import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom'


import Profile from './Profile';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

import {
    getProfileProfileThunkCreator,
    getStatus,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profile-reducer';


type PathParamsType = {
    userId: string

}


export type ProfilesPropsType = RouteComponentProps<PathParamsType>


const ProfileContainer = React.memo((props: ProfilesPropsType) => {

    const { profile,status }= useSelector((state:AppStateType) => state.profilePage)
    const { id }= useSelector((state:AppStateType) => state.auth.data)
    const dispatch = useDispatch();



    const refreshProfile = useCallback(() => {
        let userId = props.match.params.userId
        if (!userId) {
            userId = String(id)
            if (!userId) props.history.push('/login')
        }
        dispatch(getProfileProfileThunkCreator(userId))
        dispatch(getStatus(userId))
    },[id,props.history,props.match.params.userId,dispatch])


    return (
        <Profile
            profile={profile}
            ParamsUserId={props.match.params.userId}
            status={status}
            getStatus={getStatus}
            updateStatus={updateStatus}
            saveProfile={saveProfile}
            savePhoto={savePhoto}
            refreshProfile = {refreshProfile}



        />
    );
})

export default compose<React.ComponentType<any>>(withRouter,withAuthRedirect)(ProfileContainer)