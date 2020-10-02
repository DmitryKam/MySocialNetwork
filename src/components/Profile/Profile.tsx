import React from 'react';
import s from './Profile/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes} from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {PostType, ProfilePageType} from '../../redux/profile-reducer';
import {StoreReduxType} from '../../redux/redux-store';


type ProfilePostType = {
    store: StoreReduxType
}


function Profile(props: ProfilePostType) {

    return (
        <div className={'content'}>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
            />

        </div>
    );
}

export default Profile;