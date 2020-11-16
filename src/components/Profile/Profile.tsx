import React from 'react';
import s from './Profile/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';
import {ProfilesPropsType} from './ProfileContainer';



function Profile(props: ProfilesPropsType) {

    return (
        <div className={'content'}>
            <ProfileInfo
                profile = {props.profile}
                getStatus = {props.getStatus}
                updateStatus={props.updateStatus}
                status = {props.status}

            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;