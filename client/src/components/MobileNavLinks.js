import React from 'react';
import { Link } from 'react-router-dom';

const MobileNavLinks = ({ logOut }) => {
    return (
        <div className="mobile-links">
            <Link className="link" to="/main">View Issues</Link>
            <Link className="link" to="/addissue">Add Issue</Link>
            <Link className="link" to="/myissues">My Issues</Link>
            <Link className="link log-out" onClick={() => logOut()} to="/">Log out</Link>
        </div>
    )
}

export default MobileNavLinks
