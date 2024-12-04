import React from 'react'
import { Link } from 'react-router-dom';
import Bird1 from '../assets/img/bird1.svg';
import Bird2 from '../assets/img/bird2.svg';

import MobileNav from './MobileNav';
import NavLinks from './NavLinks';

const NavBar = ({ isLoggedIn, logOut }) => {
    return (
        <nav className="nav-bar">
            <div className="title-container">
                <img className="bird1" src={Bird1} alt="bird 1" srcset="" />
                <img className="bird2" src={Bird2} alt="bird 2" srcset="" />
                <img className="bird3" src={Bird1} alt="bird 3" srcset="" />
                <h3 className="app-title">Climate Action 101</h3>
            </div>

            <NavLinks logOut={logOut} />
            <MobileNav logOut={logOut} />
        </nav>
    )
}

export default NavBar
