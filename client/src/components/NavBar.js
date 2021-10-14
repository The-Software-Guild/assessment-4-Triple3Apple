import React from 'react'
import { Link } from 'react-router-dom';
import Bird1 from '../assets/img/bird1.svg';
import Bird2 from '../assets/img/bird2.svg';

const NavBar = ({ isLoggedIn, logOut }) => {
    return (
        <nav className="nav-bar">
            <div className="title-container">
                <img className="bird1" src={Bird1} alt="bird 1" srcset="" />
                <img className="bird2" src={Bird2} alt="bird 2" srcset="" />
                <img className="bird3" src={Bird1} alt="bird 3" srcset="" />
                <h3 className="app-title">Climate Action 101</h3>
            </div>

            <div className="nav-links">
                <Link className="link" to="/main">View Issues</Link>
                <Link className="link" to="/addissue">Add Issue</Link>
                <Link className="link" to="/myissues">My Issues</Link>
                <Link className="link log-out" onClick={() => logOut()} to="/">Log out</Link>
            </div>
        </nav>
    )
}

export default NavBar
