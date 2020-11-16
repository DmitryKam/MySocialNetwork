import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {AuthType} from '../../redux/auth-reducer';
import {PropsType} from './HeaderContainer';

type HeaderPropsType = {
    isAuth:boolean
    login:string
}


function Header(props:PropsType) {
    return(
        <header className={s.header}>
            <img src={'https://d2pye4zfc3qqup.cloudfront.net/wp-content/uploads/2016/11/10100802/Header-Immage-Moon-Rover.png'}/>
            <div className={s.loginBlock}>
            {props.isAuth
                ? props.login
                :<NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
    );
}

export default Header;
