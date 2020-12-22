import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


let mapStateToPropsRedirect = (state:any) => ({
    isAuth: state.auth.data.isAuth
})


export const withAuthRedirect = (Component:any) =>{

    class RedirectComponent extends React.Component<any, any>{
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>

            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsRedirect)(RedirectComponent);
}
