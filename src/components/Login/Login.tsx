import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {authMeThunkCreator, loginTC, logoutTC} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {RootState} from '../../redux/redux-store';
import s from '../../common/FormsControls/FormsControls.module.css'


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    //captcha:string
}
type OwnPropsType = {}

type StateType = {}

type mapStatePropsType = {
    // captchaUrl:string|null
    isAuth: boolean

}

type mapDispatchPropsType = {
    authMeThunkCreator: () => void
    loginTC: (login: string, password: string, rememberMe: boolean) => void
}

type LoginPropsOwnProps = {}


export type LoginPropsType = LoginFormValuesType & mapStatePropsType & mapDispatchPropsType

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType> & LoginPropsOwnProps> = ({handleSubmit, error}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <Field
                placeholder={'Email'}
                name={'email'}
                component={Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field
                placeholder={'Password'}
                name={'password'}
                type={'password'}
                component={Input}
                validate={[required]}
            />
        </div>
        <div>
            <Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me
        </div>
        <div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

let LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: RootState): mapStatePropsType => ({
    isAuth: state.auth.data.isAuth,
    //captchaUrl:state.auth.data.captchaUrl
})

export default connect(mapStateToProps, {
    authMeThunkCreator,
    loginTC,
    logoutTC
})(Login);