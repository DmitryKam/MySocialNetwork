import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import {connect} from 'react-redux';
import {logoutTC} from '../../redux/auth-reducer';
import {RootState} from '../../redux/redux-store';


type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {

    login: string | null,
    isAuth: boolean

    messages: string[],
    resultCode: number
}

type mapDispatchPropsType = {
    logoutTC:()=>void

}

export type HeadersPropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class HeaderContainer extends React.Component<HeadersPropsType, StateType> {

    componentDidMount(): void {

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

export default connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {logoutTC})(HeaderContainer);
