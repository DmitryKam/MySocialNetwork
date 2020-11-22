import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import ProfileStatus from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: ProfileType
    getStatus: (userId: string) => void
    updateStatus:(status: string) => void
    status: string
}


function ProfileInfo(props: ProfileInfoPropsType) {
    if (!props.profile) {
        return <Preloader/>
    }

    return (<div>

            <div className={s.descriptionblock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : ""}/>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div>{props.profile.aboutMe}</div>

            </div>
            <div>
                <ProfileStatus {...props}/>
            </div>

        </div>
    )
}

export default ProfileInfo;