import React, {ChangeEvent, useState} from 'react';

import styles from './ProfileInfo.module.css'
import Preloader from '../../../common/Preloader/Preloader';
import {ProfileType} from '../../../redux/profile-reducer';
import profPhoto from '../../../assets/images/user.png';
import ProfileDataFormReduxForm from '../ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


type ProfileInfoPropsType = {
    profile: ProfileType
    getStatus: (userId: string) => void
    updateStatus: (status: string | null) => void
    savePhoto: (savePhoto: any) => void
    status: string | null
    isOwner: boolean
    saveProfile: (pfofile: ProfileType) => void
}


const ProfileInfo:React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile,...props})=> {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }


    const onMyPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {


//e.target.files.length
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData: ProfileType) => {
        //@ts-ignore
        saveProfile(formData).then(()=>{
            setEditMode(false)
            }
        );

    }

    return (<div>

            <div className={styles.descriptionblock}>
                <img src={profile.photos.large || profPhoto} className={styles.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMyPhotoSelected}/>}

                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} isOwner={isOwner}
                                                profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}
                    />}


            </div>
            <div>
                <ProfileStatusWithHooks {...props} status={status} updateStatus={updateStatus}/>
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

const ProfileData = (props: ProfileDataType) => {
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

            // @ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>
    </div>
}


export const Contact = (props: ContactPropsType) => {
    return <div className={styles.contact}><b>{props.contactTitle}</b>: {props.contactValue} </div>

}