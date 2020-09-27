import React, {ChangeEvent} from 'react';
import s from './Dialog.module.css'
import DialogItem, {DialodItemPropsType} from './DialogsItem/DialogsItem';
import DialogMessage, {DialogMessagePropsType} from './DialogsMessage/DialogsMessage';
import {ActionsTypes, changeNewTextAC, sendMessageAC} from '../../redux/state';

type DialogsPropsType = {
    dialogs: Array<DialodItemPropsType>
    messages: Array<DialogMessagePropsType>
    newMessageBody: string
    dispatch: (action: ActionsTypes) => void

}

function Dialogs(props: DialogsPropsType) {

    let dialogsElement = props.dialogs.map(d => <DialogItem idName={d.idName} dialogName={d.dialogName}/>)
    let messageElement = props.messages.map(m => <DialogMessage id={m.id} message={m.message}/>)
    const newMessageBody = props.newMessageBody;

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(changeNewTextAC(e.currentTarget.value))
    }
    const onSendMessageClick = () => {
        props.dispatch(sendMessageAC(newMessageBody))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}  </div>
                <div>
                    <div>
                        <textarea onChange={onNewMessageChange}
                                  value={newMessageBody}
                                  placeholder={'Enter your message'}>
                    </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>


                </div>
            </div>

        </div>

    )

}


export default Dialogs;