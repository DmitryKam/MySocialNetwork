import React from 'react';
import {ActionsTypes} from '../../../redux/store';
import {addPostAC, ProfilePageType, updateNewMessageTextAC} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {StoreReduxType} from '../../../redux/redux-store';
import StoreContext from '../../../StoreContext';


function MyPostsContainer() {
    return (
        <StoreContext.Consumer>{
            (store)=> {

                //let state = store.getState() ;
                let dispatchs = store.dispatch
                let addPosts = () => {
                    if (store.getState().profilePage.newPostText) {
                        dispatchs(addPostAC(store.getState().profilePage.newPostText))
                    }
                }
                const onChangeText = (text: string) => {
                    dispatchs(updateNewMessageTextAC(text))
                }
                return(
            <MyPosts
                onChangeText={onChangeText}
                addPosts={addPosts}
                posts={store.getState().profilePage.posts}
                newPostText={store.getState().profilePage.newPostText}/>
                )}
            }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;