import React, {ChangeEvent, useState} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../redux/profile-reducer';
import {UsersPageType} from '../../../redux/users-reducer';



type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText:string
    onChangeText:(text:string)=>void
    addPosts:(text:string)=>void

}


function MyPosts(props: MyPostsPropsType) {

    let postElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

let onAddPosts = () => {
        if(props.newPostText) {
            props.addPosts(props.newPostText);
        }
    }

    const onChangeText = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        let text = (e.currentTarget.value)
        props.onChangeText(text)
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
                <button onClick={onAddPosts}>Add posts</button>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}

export default MyPosts;