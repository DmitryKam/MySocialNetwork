import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {ProfileType} from '../../redux/profile-reducer';
import {InjectedFormProps, reduxForm} from 'redux-form';
import styles from './ProfileInfo/ProfileInfo.module.css'



type ProfileDataFormPropsType = {
    //isOwner:boolean
    //profile:ProfileType
}

type ProfileDataPropsOwnProps = {
    isOwner:boolean
    onSubmit:(formData:any)=>void
    profile:ProfileType
}

//export type ProfileDataFormType = ProfileDataFormPropsType & mapStatePropsType & mapDispatchPropsType


const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, ProfileDataPropsOwnProps> & ProfileDataPropsOwnProps> = ({profile,handleSubmit,error,isOwner}) => {
    return <form onSubmit={handleSubmit}>
        {isOwner && <div>
            <div><button>save</button> </div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}

        </div>}
        <div>
            <b>Full name:</b> {createField("Full name", "fullName",[], Input )}
        </div>
        <div>
            {/*<b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}*/}
            <b>Looking for a job:</b> { createField("", "lookingForAJob", [], Input, {type: "checkbox"} )}
        </div>

        {/*{props.profile.lookingForAJobDescription && */}
        <div>
            <b>My proffessional skills:</b>{createField("My proffessional skills","lookingForAJobDescription",[],Textarea)}

        </div>
        {/*}*/}

        <div>
            <b>About me:</b> {createField("About me","aboutMe",[],Textarea)}
        </div>

       <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
            // @ts-ignore
           return <div className={styles.contact} key={key}>
               <b>{key}: { createField(key,"contacts."+key,[],Input) }</b>
               {/*<Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>*/}
           </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType,ProfileDataPropsOwnProps>({form:"edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm