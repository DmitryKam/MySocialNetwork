import React from 'react';
import k from './Post.module.css';

type PostPropsType = {
    message:string
    likesCount:string
}

function Post(props:PostPropsType) {

    return (
        <div className={k.item}>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU'/>
            {props.message}
            <div>
                <span>Liks{props.likesCount}</span>
            </div>
        </div>
    );
}

export default Post;