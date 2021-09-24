import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, logOut }) => {
    return (
        <nav className="nav-bar">
            <h3 className="app-title">Climate Action 101</h3>
            <Link to="/main">Home Page</Link>
            <Link to="/addissue">Add Issue</Link>
            <Link to="/myissues">My Issues</Link>
            <Link onClick={() => logOut()} to="/">Log out</Link>

        </nav>
    )
}

export default NavBar
