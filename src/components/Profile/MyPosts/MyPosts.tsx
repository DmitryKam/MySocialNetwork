import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../redux/profile-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControls/FormsControls';


type MyPostsPropsType = {
    posts: Array<PostType>
    addPosts: (text: string) => void

}


const MyPosts = React.memo((props: MyPostsPropsType) => {

    console.log('Render')
    let postElement = [...props.posts].map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onSubmit = (formData: AddPostFormDataType) => {
        if (formData.newMyPost) {
            props.addPosts(formData.newMyPost)
        }
    }

    return (<div className={s.postsBock}>
            my posts
            <div>
                <AddPostReduxForm onSubmit={onSubmit}/>
            </div>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
});




type AddPostFormDataType = {
    newMyPost: string
}
const maxLength = maxLengthCreator(10);

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (props) => {



    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={Textarea}
                name={'newMyPost'}
                placeholder="Enter your message"
                validate = {[required,maxLength]}/>
        </div>
        <div>
            <button>Add posts</button>
        </div>
    </form>
}

let AddPostReduxForm = reduxForm<AddPostFormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm)


export default MyPosts;