import React, {ChangeEvent} from 'react';
import s from './Dialog.module.css'
import DialogItem from './DialogsItem/DialogsItem';
import DialogMessage from './DialogsMessage/DialogsMessage';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import {AuthType} from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';



type DialogsPropsType = {
    dialogsPage: DialogsPageType
    auth:AuthType
    onNewMessageChange:(text:string)=>void
    onSendMessageClick:(text:string)=>void
}

function Dialogs(props: DialogsPropsType) {

    let dialogsElement = props.dialogsPage.dialogs.map(d => <DialogItem key={d.idName} idName={d.idName} dialogName={d.dialogName}/>)
    let messageElement = props.dialogsPage.messages.map(m => <DialogMessage key={m.id} id={m.id} message={m.message}/>)
    const newMessageBody = props.dialogsPage.newMessageBody;


    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onNewMessageChange(e.currentTarget.value)
    }
    const onSendMessageClick = () => {
        props.onSendMessageClick(newMessageBody)
    }


    if(!props.auth.data.isAuth) return <Redirect to={'/login'}/>

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