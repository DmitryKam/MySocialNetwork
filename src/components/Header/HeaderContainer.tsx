import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';
import {RootState} from '../../redux/redux-store';

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
    setAuthUserData: (userId: number | null, email: string, login: string) => void

}

type PropsType = OwnPropsType & mapStatePropsType & mapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, StateType> {

    componentDidMount():void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode===0){
                    let {userId: id, email, login} = response.data.data;
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
