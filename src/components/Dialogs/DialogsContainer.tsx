import React from 'react';

import {changeNewTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {StoreReduxType} from '../../redux/redux-store';

type DialogsPropsType = {
    store: StoreReduxType
}

function DialogsContainer(props: DialogsPropsType) {
    let store = props.store.getState();
    let dispatchs = props.store.dispatch;


    const onNewMessageChange = (text: string) => {
        dispatchs(changeNewTextAC(text))
    }
    const onSendMessageClick = (text: string) => {
        dispatchs(sendMessageAC(text))
    }

    return (<Dialogs
        dialogsPage={store.dialogPage}
        onNewMessageChange={onNewMessageChange}
        onSendMessageClick={onSendMessageClick}

    />)

}


export default DialogsContainer;