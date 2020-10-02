import React, {ChangeEvent, useState} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../redux/profile-reducer';



type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText:string
    onChangeText:(text:string)=>void
    addPosts:()=>void
}


function MyPosts(props: MyPostsPropsType) {

    let postElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

let onAddPosts = () => {
        if(props.newPostText) {
            props.addPosts();
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