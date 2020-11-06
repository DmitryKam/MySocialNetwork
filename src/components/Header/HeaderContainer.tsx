import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import {connect} from 'react-redux';
import {authMeThunkCreator} from '../../redux/auth-reducer';
import {RootState} from '../../redux/redux-store';


type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {

    //id: number | null,
    login: string | null,
    // email: number|null,
    isAuth: boolean

    messages: string[],
    resultCode: number
}

type mapDispatchPropsType = {
    authMeThunkCreator: () => void

}

export type PropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, StateType> {

    componentDidMount(): void {
        this.props.authMeThunkCreator();
        // usersAPI.getMe()
        //     .then(data => {
        //         if (data.resultCode===0){
        //             let {id, email, login} = data.data;
        //             this.props.setAuthUserData(id, email, login)
        //         }
        //             })
    }


    render() {
        return <Header
            {...this.props}
        />
    }
}

const mapStateToProps = (state: RootState): mapStatePropsType => {
    return (
        {
            //id: state.auth.data.id,
            login: state.auth.data.login,
            //email: state.auth.data.email,
            isAuth: state.auth.data.isAuth,

            messages: state.auth.messages,
            resultCode: state.auth.resultCode,
        }
    )
}

export default connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {authMeThunkCreator})(HeaderContainer);
