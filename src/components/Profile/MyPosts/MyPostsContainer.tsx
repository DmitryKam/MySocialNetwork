import React from 'react';
import {ActionsTypes} from '../../../redux/store';
import {addPostAC, ProfilePageType, updateNewMessageTextAC} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {StoreReduxType} from '../../../redux/redux-store';



type MyPostsPropsType = {
    store:StoreReduxType
}


function MyPostsContainer(props: MyPostsPropsType) {

    let store = props.store.getState()
    let dispatchs = props.store.dispatch

    let addPosts = () => {
        if(store.profilePage.newPostText) {
           dispatchs(addPostAC(store.profilePage.newPostText))
        }
    }

    const onChangeText = (text:string)=>{
      dispatchs(updateNewMessageTextAC(text))
    }


    return (<MyPosts
            onChangeText = {onChangeText}
            addPosts={addPosts}
            posts={store.profilePage.posts}
            newPostText={store.profilePage.newPostText}/>
    );
}

export default MyPostsContainer;