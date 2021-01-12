import React from 'react';
import {useFormik} from 'formik';

import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../redux/profile-reducer';
import {useDispatch} from 'react-redux';



type MyPostsPropsType = {
    posts: Array<PostType>
    addPosts: (text: string) => void
}


const MyPosts = React.memo((props: MyPostsPropsType) => {

    console.log('My Post Render')

    const dispatch = useDispatch();

    const postElement = [...props.posts].map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const formik = useFormik({
        validate: (values) => {
            if (!values) {
                return {
                    post: 'Post is required'
                }
            }
        },
        initialValues: {
            post: '',

        },
        onSubmit: (values)=>{
            dispatch(props.addPosts(values.post));
        }
    })


    return <div className={styles.postsBock}>
            my posts
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor={'post'}/>
                    <input
                        type="post"
                        name="post"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.post}
                    />
                    <button>add post</button>
                </form>
            </div>
            <div className={styles.posts}>
                {postElement}
            </div>
        </div>

})




export default MyPosts;