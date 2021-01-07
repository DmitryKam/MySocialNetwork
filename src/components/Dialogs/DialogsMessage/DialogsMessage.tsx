import React from 'react';
import s from './../Dialog.module.css'

export type DialogMessagePropsType = {
    id: number
    message: string
}

const  DialogMessage = React.memo((props: DialogMessagePropsType) => {

    return (<div className={s.message}>
        {props.message}
    </div>)
})

export default DialogMessage;