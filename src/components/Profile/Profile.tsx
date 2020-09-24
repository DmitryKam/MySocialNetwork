import React, {ChangeEvent} from 'react';
import s from './Profile/Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';
import {ActionsTypes} from '../../redux/state';


export type ArrayPostType = {
    id: number
    message: string
    likesCount: string
}

type ProfilePostType = {
    posts: Array<ArrayPostType>
    newPostText:string
    dispatch: (action:ActionsTypes)=>void
}


function Profile(props: ProfilePostType) {

    return (
        <div className={'content'}>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                newPostText ={props.newPostText}
                dispatch={props.dispatch}
            />

        </div>
    );
}

export default Profile;