import React, {Dispatch} from 'react';
import store, {ActionsTypes} from '../../../redux/redux-store';
import {addPostAC} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {RootState} from '../../../redux/redux-store';
import {connect} from 'react-redux';


let mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
    }
}
let mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {

    return {
        addPosts: (text: string) => {
            dispatch(addPostAC(text))

        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;