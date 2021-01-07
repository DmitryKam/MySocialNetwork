import React from 'react';
import styles from './Post.module.css';

type PostPropsType = {
    message:string
    likesCount:string
}

const Post= React.memo((props:PostPropsType) => {

    return (
        <div className={ styles.item }>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU' alt={'avatar'}/>
            { props.message }
            <div>
                <span>Liks{ props.likesCount }</span>
            </div>
        </div>
    );
})

export default Post;