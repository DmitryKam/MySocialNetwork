import React from 'react';

import {AppStateType} from '../../../redux/redux-store';
import {addPostAC} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {useSelector} from 'react-redux';


const MyPostsContainer = ()=> {

    const posts = useSelector((state:AppStateType) => state.profilePage.posts)


    return <MyPosts
        posts={posts}
        addPosts={addPostAC}
        />
}

export default MyPostsContainer;