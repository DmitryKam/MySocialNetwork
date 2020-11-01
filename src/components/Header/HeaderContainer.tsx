import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';
import {RootState} from '../../redux/redux-store';
import {usersAPI} from '../../API/api';

type StateType = {}

type OwnPropsType = {}

type mapStatePropsType = {
    data: {
        //id: number | null,
        login: number|null,
       // email: number|null,
        isAuth:boolean
    }
    messages: string[],
    resultCode: number
}

type mapDispatchPropsType = {
    setAuthUserData: (id: number | null, email: string, login: string) => void

}

type PropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, StateType> {

    componentDidMount():void {
        usersAPI.getMe()
            .then(data => {
                if (data.resultCode===0){
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login)
                }
                    })
    }


    render() {
        return <Header
            {...this.props}
            auth = {this.props}
        />
    }
}

const mapStateToProps = (state: RootState): mapStatePropsType => {
    return ({
        data: {
            //id: state.auth.data.id,
            login: state.auth.data.login,
            //email: state.auth.data.email,
            isAuth:state.auth.data.isAuth,
        },
        messages: state.auth.messages,
        resultCode: state.auth.resultCode,
            })
}

export default connect<mapStatePropsType, mapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {setAuthUserData})(HeaderContainer);
