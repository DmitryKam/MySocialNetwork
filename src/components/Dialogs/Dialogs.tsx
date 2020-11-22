import React, {ChangeEvent} from 'react';
import s from './Dialog.module.css'
import DialogItem from './DialogsItem/DialogsItem';
import DialogMessage from './DialogsMessage/DialogsMessage';
import {DialogsPageType} from '../../redux/dialogs-reducer';
import {AuthType} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    auth: AuthType
    onSendMessageClick: (text: string) => void
}

function Dialogs(props: DialogsPropsType) {

    let dialogsElement = props.dialogsPage.dialogs.map(d => <DialogItem key={d.idName} idName={d.idName}
                                                                        dialogName={d.dialogName}/>)
    let messageElement = props.dialogsPage.messages.map(m => <DialogMessage key={m.id} id={m.id} message={m.message}/>)


    if (!props.auth.data.isAuth) return <Redirect to={'/login'}/>


    const addNewMessage = (formData:AddMessageFormDataType) =>{
        props.onSendMessageClick(formData.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}  </div>
                <div>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>

                </div>
            </div>

        </div>

    )

}

type AddMessageFormDataType ={
    newMessageBody:string
}
const maxLength = maxLengthCreator(100);

const AddMessageForm:React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component = {Textarea}
                name={"newMessageBody"}
                placeholder="Enter your message"
                validate = {[required,maxLength]}
            />
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>

}

let AddMessageReduxForm = reduxForm<AddMessageFormDataType>({form:'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;