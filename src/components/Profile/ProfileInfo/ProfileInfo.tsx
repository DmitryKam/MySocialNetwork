import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

type ProfileInfoPropsType = {
    profile: ProfileType
    getStatus: (userId: string) => void
    updateStatus:(status: string|null) => void
    status: string | null
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
                <ProfileStatusWithHooks {...props} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

export default ProfileInfo;