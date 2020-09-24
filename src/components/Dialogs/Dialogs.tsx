import React from 'react';
import s from './Dialog.module.css'
import {NavLink} from 'react-router-dom';
import DialogItem, {DialodItemPropsType} from './DialogsItem/DialogsItem';
import DialogMessgae, {DialogMessagePropsType} from './DialogsMessage/DialogsMessage';

type DialogsPropsType = {
    dialogs: Array<DialodItemPropsType>
    messages: Array<DialogMessagePropsType>

}

function Dialogs(props: DialogsPropsType) {
    let dialogsElement = props.dialogs.map( d=> <DialogItem  idName={d.idName} dialogName={d.dialogName}/>)
    let messageElement = props.messages.map(m => <DialogMessgae id={m.id} message={m.message}/> )
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messageElement}
            </div>
            <textarea></textarea>
        </div>

    )

}


export default Dialogs;