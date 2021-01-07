import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppStateType } from '../redux/redux-store';


let mapStateToPropsRedirect = (state:AppStateType) => ({
    isAuth: state.auth.data.isAuth
})

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = ({ isAuth, ...restProps }) => {

            if (!isAuth) return <Redirect to={'/login'}/>

            return <WrappedComponent { ...restProps as WCP }/>
        }
    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsRedirect, {})(RedirectComponent)

}
