import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';
import { HeadersPropsType } from './HeaderContainer';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';


 const Header = React.memo(function(props:HeadersPropsType) {
const avatar = useSelector<AppStateType,string|null>(state => state.profilePage.profile.photos.small)
    return(
        <header className={ styles.header }>
                <img src= {`${avatar}`} alt={'avatar'}/>
            <div className={ styles.loginBlock }>

            { props.isAuth
                ? <div>{ props.login } - <button onClick={ props.logoutTC }>Logout</button></div>
                :<NavLink to={'/login'}> Login </NavLink> }
        </div>
        </header>
    );
})

export default Header;
