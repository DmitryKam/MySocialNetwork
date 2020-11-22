import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {authMeThunkCreator, loginTC, logoutTC} from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import {RootState} from '../../redux/redux-store';


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type OwnPropsType = {

}

type StateType = {

}

type mapStatePropsType = {
    isAuth:boolean

}

type mapDispatchPropsType = {
    authMeThunkCreator: () => void
    login: (login: string, password:string, rememberMe:boolean) => void
}

export type LoginPropsType = FormDataType & mapStatePropsType & mapDispatchPropsType

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={"Email"}
                name = {'email'}
                component = {Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                placeholder={"Password"}
                name = {'password'}
                type={"password"}
                component = {Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                type={"checkbox"}
                name={'rememberMe'}
                component = {Input}
            /> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

let LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm);

function Login(props:any) {

    const onSubmit = (formData:FormDataType) =>{
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={"/profile"}/>
    }

    return<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state:RootState):mapStatePropsType =>({
    isAuth: state.auth.data.isAuth
})

export default connect(mapStateToProps, {
    authMeThunkCreator,
    loginTC,
    logoutTC
})(Login);