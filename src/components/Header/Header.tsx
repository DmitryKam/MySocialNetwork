import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {AuthType} from '../../redux/auth-reducer';

type HeaderPropsType = {
    auth: any
}


function Header(props:HeaderPropsType) {
    return(
        <header className={s.header}>
            <img src={'https://d2pye4zfc3qqup.cloudfront.net/wp-content/uploads/2016/11/10100802/Header-Immage-Moon-Rover.png'}/>
        <div className={s.loginBlock}>
            {props.auth.isAuth
                ? props.auth.login
                :<NavLink to={'/login'}>Login</NavLink>}
        </div>
            <div ></div>
        </header>
    );
}

export default Header;
