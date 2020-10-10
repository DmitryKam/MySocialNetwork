import React from 'react';
import {changeNewTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {RootState} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {ActionsTypes} from '../../redux/store';


let mapStateToProps = (state:RootState) => {
    return {
        dialogsPage: state.dialogPage
    }
}
let mapDispatchToProps = (dispatch:Dispatch<ActionsTypes>) => { // Нужно подумать
    return {
        onNewMessageChange: (text: string)=>{
            dispatch(changeNewTextAC(text))
        },
        onSendMessageClick: (text: string)=>{
            dispatch(sendMessageAC(text))
        }
    }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs);

export default DialogsContainer;