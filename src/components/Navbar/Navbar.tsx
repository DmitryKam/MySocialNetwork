import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom';
import DialogItem, {DialodItemPropsType} from '../Dialogs/DialogsItem/DialogsItem';

type MyFrends = {
    idName: number
    dialogName: string
}

type NavbarPropsType = {
    friends: Array<MyFrends>
}

function Navbar(props: NavbarPropsType) {
    return (<nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={'/profile'} activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/messages'} activeClassName={s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/news'} activeClassName={s.active}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/music'} activeClassName={s.active}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={'/settings'} activeClassName={s.active}>Settings</NavLink>
        </div>
        <div className={s.friends}>
            {

                props.friends.map(
                    (t) => {
                        return (
                            <div>
                                {t.dialogName}
                            </div>)
                    }
                )
            }
        </div>
    </nav>);
}

export default Navbar;