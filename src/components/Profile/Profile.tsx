import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilesPropsType} from './ProfileContainer';


const Profile = React.memo((props: ProfilesPropsType)=>{
console.log("Profile Renderer")
    let isOwner = !props.match.params.userId
    return (
        <div className={'content'}>
            <ProfileInfo
                isOwner = {isOwner}
                profile = {props.profile}
                getStatus = {props.getStatus}
                updateStatus={props.updateStatus}
                status = {props.status}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}

            />
            <MyPostsContainer/>
        </div>
    );
})

export default Profile;