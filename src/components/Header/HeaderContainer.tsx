import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';

import { logoutTC } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';



type OwnPropsType = {
}

type mapStatePropsType = {

    login: string | null,
    isAuth: boolean
    messages: string[],
    resultCode: number

}

type mapDispatchPropsType = {
    logoutTC:() => void

}

export type HeadersPropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

const HeaderContainer = React.memo(function (props: HeadersPropsType) {

    return <Header { ...props } />
})

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return (
        {
            login: state.auth.data.login,
            isAuth: state.auth.data.isAuth,
            messages: state.auth.messages,
            resultCode: state.auth.resultCode,
        }
    )
}

export default connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,{ logoutTC } )(HeaderContainer);
