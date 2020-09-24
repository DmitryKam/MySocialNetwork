import React from 'react';
import k from './Header.module.css';

function Header() {

    return(
        <header className={k.header}>
            <img src={'https://d2pye4zfc3qqup.cloudfront.net/wp-content/uploads/2016/11/10100802/Header-Immage-Moon-Rover.png'}/>
        </header>
    );
}

export default Header;