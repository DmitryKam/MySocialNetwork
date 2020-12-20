import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {HeadersPropsType} from './HeaderContainer';

type HeaderPropsType = {
    isAuth:boolean
    login:string
    logoutTC: ()=>void
}


function Header(props:HeadersPropsType) {

    return(
        <header className={s.header}>
            <img src={'https://d2pye4zfc3qqup.cloudfront.net/wp-content/uploads/2016/11/10100802/Header-Immage-Moon-Rover.png'}/>
            <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logoutTC}>Logout</button></div>
                :<NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
    );
}

export default Header;
