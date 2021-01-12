import React, {ChangeEvent, useEffect, useState} from 'react';

import styles from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import {ContactsType, ProfileType} from '../../../redux/profile-reducer';
import profPhoto from '../../../assets/images/user.png';
import ProfileStatus from './ProfileStatus';
import {ProfileDataEditForm} from '../ProfileDataForm';
import {useDispatch} from 'react-redux';


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string | null
    paramsUserId: string
    isOwner: boolean

    getStatus: (userId: string | null) => void
    updateStatus: (status: string) => void
    savePhoto: (savePhoto: File) => void
    saveProfile: (pfofile: ProfileType) => void
    refreshProfile: ()=>void
}


const ProfileInfo:React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner,paramsUserId, savePhoto, saveProfile,getStatus,refreshProfile, ...props})=> {

    const [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(refreshProfile);
    },[dispatch])


    if (!profile) {
        return <Preloader/>
    }



    const onMyPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length) {
            debugger;
            dispatch(savePhoto(e.target.files[0]));
        }
    };


    return (<div>

            <div className={styles.descriptionblock}>
                <img src={profile.photos.large || profPhoto} className={styles.mainPhoto}/>
                { isOwner && <input type={'file'} onChange={onMyPhotoSelected}/> }
                { editMode
                     ? <ProfileDataEditForm isOwner={isOwner}
                                                 profile={profile} onSubmit={setEditMode}/>
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}
                    /> }

            </div>
            <div>
                <ProfileStatus {...props} status={status} updateStatus={updateStatus} getStatus={getStatus}/>
            </div>

        </div>
    )
}

export default ProfileInfo;


interface ContactPropsType {
    contactTitle: any;
    contactValue: any
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = React.memo((props: ProfileDataType) => {
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name:</b> {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
        </div>

        {props.profile.lookingForAJobDescription && <div>
            <b>My proffessional skills:</b> {props.profile.lookingForAJobDescription}
        </div>}

        <div>
            <b>About me:</b> {props.profile.aboutMe}
        </div>

        <div>
            <b>Contacts:</b> {Object.keys(props.profile.contacts).map((key) => {


            return <Contact key={ key } contactTitle={ key } contactValue={ props.profile.contacts[key as keyof ContactsType] }/>
        })}
        </div>
    </div>
})


export const Contact = React.memo((props: ContactPropsType) => {
    return <div className={styles.contact}><b>{props.contactTitle}</b>: {props.contactValue} </div>
})