import React from 'react';
import s from './Profile/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';


type ProfilePropsType = {
    profile:ProfileType
}

function Profile(props: ProfilePropsType) {

    return (
        <div className={'content'}>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer/>

        </div>
    );
}

export default Profile;