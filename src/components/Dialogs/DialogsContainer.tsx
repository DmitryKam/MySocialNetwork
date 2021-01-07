
import {sendMessageAC} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {ActionsTypes} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';





let mapStateToProps = (state:AppStateType) => {
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



const DialogsContainer =compose<any>(connect(mapStateToProps,mapDispatchToProps), withAuthRedirect)(Dialogs)

export default DialogsContainer;