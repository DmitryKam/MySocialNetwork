import React from 'react';
import s from './../Dialog.module.css'
import {NavLink} from 'react-router-dom';

export type DialogMessagePropsType = {
    id: number
    message: string
}

function DialogMessage(props: DialogMessagePropsType) {

    return (<div className={s.message}>
        {props.message}
    </div>)
}

export default DialogMessage;