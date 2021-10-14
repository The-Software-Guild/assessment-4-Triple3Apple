import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, logOut }) => {
    return (
        <nav className="nav-bar">
            <div className="title-container">
                <img className="bird1" src="../assets/img/bird1svg" alt="" srcset="" />
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
