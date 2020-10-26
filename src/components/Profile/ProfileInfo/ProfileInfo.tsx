import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';

type ProfileInfoPropsType = {
    profile: ProfileType
}


function ProfileInfo(props:ProfileInfoPropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (<div>
            <div>
                <img
                    src={'https://image.shutterstock.com/image-photo/niagara-waterfall-big-water-fall-260nw-1219662829.jpg'}/>
            </div>
            <div className={s.descriptionblock}>
                <img src={props.profile.photos.large}/>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div>{props.profile.aboutMe}</div>
            </div>

        </div>
    )
}

export default ProfileInfo;