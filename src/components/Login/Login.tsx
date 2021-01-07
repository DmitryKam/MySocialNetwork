import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { createField, Input } from '../../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { authMeThunkCreator, AuthType, loginTC, logoutTC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import styles from '../../common/FormsControls/FormsControls.module.css'


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


type mapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean

}

type mapDispatchPropsType = {
    authMeThunkCreator: () => void
    loginTC: (login: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void
}

type LoginPropsOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginPropsOwnProps> & LoginPropsOwnProps> = ({ handleSubmit, error, captchaUrl }) => {

    return (<form onSubmit={ handleSubmit }>

            { createField('Email', 'email', [required], Input,) }
            { createField('Password', 'password', [required], Input, { type: 'password' }) }
            { createField(null, 'rememberMe', null, Input, { type: 'checkbox' }, 'RememberMe') }
            { captchaUrl && <img src={ captchaUrl } alt={ "captcha" }/> }
            { captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {}) }


                { error && <div className={ styles.formSummaryError }> { error }</div> }

            <div> <button> Login </button> </div>
        </form>

    )
}

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginPropsOwnProps>({ form: 'login' })(LoginForm);

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {

    const captchaUrl = useSelector<AppStateType, AuthType>((state) => state.auth)

    const onSubmit = (formData: LoginFormValuesType) => {
        debugger;
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {

        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={ onSubmit } captchaUrl={ captchaUrl.data.captchaUrl }/>
        </div>
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
    isAuth: state.auth.data.isAuth,
    captchaUrl: state.auth.data.captchaUrl
})

export default connect(mapStateToProps, {
    authMeThunkCreator,
    loginTC,
    logoutTC
})(Login);