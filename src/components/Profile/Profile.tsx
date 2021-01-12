import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../redux/profile-reducer';

type ProfileTypes = {
    profile: ProfileType
    ParamsUserId: string
    status: string | null

    getStatus: (string: string | null)  => void
    updateStatus: (status: string) => void
    savePhoto: (savePhoto: File) => void
    saveProfile: (prifile: ProfileType) => void
    refreshProfile: ()=>void
}

const Profile = React.memo((props:ProfileTypes)=>{
console.log("Profile Renderer")
    let isOwner = !props.ParamsUserId
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
                paramsUserId={props.ParamsUserId}
                refreshProfile={props.refreshProfile}

            />
            <MyPostsContainer/>
        </div>
    );
})

export default Profile;