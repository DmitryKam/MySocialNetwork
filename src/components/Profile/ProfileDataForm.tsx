import {useFormik} from 'formik';
import React from 'react';

import {ContactsType, ProfileType, saveProfile} from '../../redux/profile-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import styles from './ProfileInfo/ProfileInfo.module.css';


type ProfileDataPropsOwnProps = {
    isOwner:boolean
    onSubmit:(edit: boolean)=>void
    profile:ProfileType
}




export const ProfileDataEditForm = (props:ProfileDataPropsOwnProps) => {

    const dispatch = useDispatch();

    const profile = useSelector<AppStateType,ProfileType>(state => state.profilePage.profile)


    const formik = useFormik({
        initialValues: {
            fullName: props.profile.fullName,
            lookingForAJob:props.profile.lookingForAJob,
            lookingForAJobDescription:props.profile.lookingForAJobDescription,
            aboutMe:props.profile.aboutMe,
            contacts:{
                facebook: props.profile.contacts.facebook,
                github: props.profile.contacts.github,
                instagram: props.profile.contacts.instagram,
                mainLink: props.profile.contacts.mainLink,
                twitter: props.profile.contacts.twitter,
                vk: props.profile.contacts.vk,
                website: props.profile.contacts.website,
                youtube: props.profile.contacts.youtube,
            },
        },
        validate: (values) => {
            if (!values.fullName) {
                return {
                    fullName: 'fullName is required'
                }
            }
        },
        onSubmit: values => {
            const profileInThunk:ProfileType = {
                userId:profile.userId,
                fullName:values.fullName,
                lookingForAJob:values.lookingForAJob,
                lookingForAJobDescription:values.lookingForAJobDescription,
                aboutMe:values.aboutMe,
                contacts:{
                    facebook: values.contacts.facebook,
                    github: values.contacts.github,
                    instagram: values.contacts.instagram,
                    mainLink: values.contacts.mainLink,
                    twitter: values.contacts.twitter,
                    vk: values.contacts.vk,
                    website: values.contacts.website,
                    youtube: values.contacts.youtube,
                },
                photos:profile.photos
            }
            debugger;
            dispatch(saveProfile(profileInThunk));

            //alert(JSON.stringify(values));
            props.onSubmit(false)
        },
    })

     return <div>
         <form onSubmit={formik.handleSubmit}>
        <div>
            <b>Full name:</b>
            <input
            type="fullName"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
        />
            {formik.errors.fullName ? <div>{formik.errors.fullName}</div> : null}
        </div>
        <div>
            <b>Looking for a job:</b>
        <input
        type={"checkbox"}
        name={"lookingForAJob"}
        checked={formik.values.lookingForAJob}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        </div>
             <div>
            <b>My proffessional skills:</b>
             <input
                 type={"textarea"}
                 name={"lookingForAJobDescription"}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.lookingForAJobDescription}
             />
        </div>

        <div>
            <b>About me:</b>
            <input
                type={"textarea"}
                name={"aboutMe"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.aboutMe}
            />
        </div>

        <div>
            <b>Contacts:</b>

        {Object.keys(formik.values.contacts).map((key) => {
            const nameFormic = `contacts.${key}`
             return <div className={styles.contact} key={key}>
                <b>{key}:</b>

                <input
                    type={"textarea"}
                    name={nameFormic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contacts[key as keyof ContactsType]||""}
                />
            </div>
        })}

        </div>
             <button>save</button>
        </form>
    </div>


}




// const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, ProfileDataPropsOwnProps> & ProfileDataPropsOwnProps> = ({profile,handleSubmit,error,isOwner}) => {
//     return <form onSubmit={ handleSubmit }>
//         { isOwner && <div>
//             <div><button>save</button> </div>
//             { error && <div className={ styles.formSummaryError }>
//                 { error }
//             </div> }
//
//         </div>}
//
//         <div>
//             <b> Full name: </b> { createField("Full name", "fullName",[], Input ) }
//         </div>
//
//         <div>
//             <b> Looking for a job: </b> { createField("", "lookingForAJob", [], Input, { type: "checkbox" }) }
//         </div>
//
//         <div>
//             <b> My proffessional skills: </b>{ createField("My proffessional skills","lookingForAJobDescription",[],Textarea) }
//         </div>
//
//         <div>
//             <b>About me:</b> { createField("About me","aboutMe",[],Textarea) }
//         </div>
//
//        <div>
//             <b> Contacts: </b> { Object.keys(profile.contacts).map( (key) => {
//
//            return <div className={styles.contact} key={key}>
//                <b>{ key }: { createField(key,"contacts."+ key,[],Input) } </b>
//            </div>
//         }) }
//         </div>
//     </form>
// }
//
// const ProfileDataFormReduxForm = reduxForm<ProfileType,ProfileDataPropsOwnProps>({ form:"edit-profile" })(ProfileDataForm)
//
// export default ProfileDataFormReduxForm