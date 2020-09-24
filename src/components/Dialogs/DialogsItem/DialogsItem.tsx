import React from 'react';
import s from './../Dialog.module.css'
import {NavLink} from 'react-router-dom';

export type DialodItemPropsType = {
    idName: number
    dialogName: string
}

function DialogItem(props: DialodItemPropsType) {
    let path = ('/dialods/' + props.idName);
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}> {props.dialogName} </NavLink>
        </div>
    )
}

export default DialogItem;