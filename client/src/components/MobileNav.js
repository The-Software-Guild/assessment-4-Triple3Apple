import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import MobileNavLinks from './MobileNavLinks';


const MobileNav = ({ logOut }) => {

    const [hamburgerOpen, setBurgerOpen] = useState(false);

    // hook from react-router
    const location = useLocation();

    // Makes hamburger menu close when routed to different page.
    useEffect(() => {
        setBurgerOpen(false);
    }, [location]);

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

            {hamburgerOpen && <MobileNavLinks logOut={logOut} />}

        </div>
    )
}

export default MobileNav;
