import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import MobileNavLinks from './MobileNavLinks';


const MobileNav = ({ logOut }) => {

    const [hamburgerOpen, setBurgerOpen] = useState(false);

    const hamburgerIcon =
        <IoMdMenu className="hamburger no-highlight" size='50px'
            onClick={() => toggleHamburger()}
        />;

    const closeIcon =
        <AiOutlineClose className="hamburger close-icon no-highlight" size='50px'
            onClick={() => toggleHamburger()}
        />;

    const toggleHamburger = () => {
        setBurgerOpen(!hamburgerOpen);
    }


    return (
        <div className="mobile-nav-links ">
            {hamburgerOpen ? closeIcon : hamburgerIcon}

            {/* <IoMdMenu className="hamburger no-highlight" size='50px'
                onClick={() => toggleHamburger()}
            /> */}
            {hamburgerOpen && <MobileNavLinks logOut={logOut} />}
            {/* <Link className="link" to="/main">View Issues</Link>
            <Link className="link" to="/addissue">Add Issue</Link>
            <Link className="link" to="/myissues">My Issues</Link>
            <Link className="link log-out" onClick={() => logOut()} to="/">Log out</Link> */}
        </div>
    )
}

export default MobileNav;
