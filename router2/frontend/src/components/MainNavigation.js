import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

const navLinks = [
    {
        to: "/",
        label: "Home"
    },
    {
        to: "/events",
        label: "Events"
    },
    {
        to: "/newsletter",
        label: "Newsletter"
    },
    {
        to: "/auth",
        label: "Authentication"
    },
];

function MainNavigation() {
    const isActive = ({ isActive }) => isActive ? classes.active : undefined;

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    {navLinks.map(nav => <li key={nav.label}>
                        <NavLink
                            to={nav.to}
                            className={isActive}
                            end
                        >
                            {nav.label}
                        </NavLink>
                    </li>)}
                </ul>
            </nav>
            <NewsletterSignup />
        </header>
    );
}

export default MainNavigation;