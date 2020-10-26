import React, {Dispatch} from 'react';
import store, {ActionsTypes} from '../../../redux/redux-store';
import {addPostAC, updateNewMessageTextAC} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {RootState} from '../../../redux/redux-store';
import {connect} from 'react-redux';


let mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {

    return {
        onChangeText: (text: string) => {
            debugger;
            dispatch(updateNewMessageTextAC(text));
        },
        addPosts: (text: string) => {
            debugger;
            dispatch(addPostAC(text))// Не получается закинуть текст

        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;