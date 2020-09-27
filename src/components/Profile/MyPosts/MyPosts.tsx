import React, {ChangeEvent, useState} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import state, {ActionsTypes, addPostAC, updateNewMessageTextAC} from '../../../redux/state';
import {ArrayPostType} from '../Profile';

type MyPostsPropsType = {
    posts: Array<ArrayPostType>
    newPostText:string
    dispatch: (action:ActionsTypes)=>void
}


function MyPosts(props: MyPostsPropsType) {

    let postElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let addPosts = () => {
        if(props.newPostText) {
            props.dispatch(addPostAC(props.newPostText))
        }
    }

    const onChangeText = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(updateNewMessageTextAC(e.currentTarget.value))
    }

    return (<div className={s.postsBock}>
            my posts
            <div>
                <div>
                    <textarea
                        onChange={onChangeText}
                        value ={props.newPostText}
                        placeholder={'Enter your post'}
                    />
                </div>
                <button onClick={addPosts}>Add posts</button>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}

export default MyPosts;