import React from 'react';

import {changeNewTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {StoreReduxType} from '../../redux/redux-store';
import StoreContext from '../../StoreContext';

type DialogsPropsType = {
    store: StoreReduxType
}

function DialogsContainer() {
   // let store = props.store.getState();


    return (
        <StoreContext.Consumer>
            { (store)=>{
            let state = store.getState();

                let dispatchs = store.dispatch;

                const onNewMessageChange = (text: string) => {
                    dispatchs(changeNewTextAC(text))
                }
                const onSendMessageClick = (text: string) => {
                    dispatchs(sendMessageAC(text))
                }

            return(
            <Dialogs
            dialogsPage={state.dialogPage}
            onNewMessageChange={onNewMessageChange}
            onSendMessageClick={onSendMessageClick}
            />
            )
        }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;