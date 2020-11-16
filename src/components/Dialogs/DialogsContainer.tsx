import React from 'react';
import {changeNewTextAC, sendMessageAC} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {RootState} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {ActionsTypes} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';





let mapStateToProps = (state:RootState) => {
    return {
        dialogsPage: state.dialogPage,
        auth: state.auth,
    }
}
let mapDispatchToProps = (dispatch:Dispatch<ActionsTypes>) => {
    return {
        onNewMessageChange: (text: string)=>{
            dispatch(changeNewTextAC(text))
        },
        onSendMessageClick: (text: string)=>{
            dispatch(sendMessageAC(text))
        }
    }
}


//const AuthRedirectComponent = withAuthRedirect(Dialogs)

//const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);

const DialogsContainer =compose<any>(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs)

export default DialogsContainer;