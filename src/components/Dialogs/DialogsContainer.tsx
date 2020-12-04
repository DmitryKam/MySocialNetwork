import React from 'react';
import {sendMessageAC} from '../../redux/dialogs-reducer';
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
        onSendMessageClick: (newMessageBody: string)=>{
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}

//const AuthRedirectComponent = withAuthRedirect(Dialogs)

//const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
//type DialogsType = ReturnType<typeof Dialogs>

const DialogsContainer =compose<any>(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs)

export default DialogsContainer;