import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

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
    }
];

function MainNavigation() {
    const isActive = ({ isActive }) => isActive ? classes.active : undefined;
    const token = useRouteLoaderData('root');

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
                    {!token &&
                        <li>
                            <NavLink
                                to="/auth?mode=login"
                                className={isActive}
                                end
                            >
                                Authentication
                            </NavLink>
                        </li>}
                    {token &&
                        <li>
                            <Form action='/logout' method='post'>
                                <button >Logout</button>
                            </Form>
                        </li>}
                </ul>
            </nav>
            <NewsletterSignup />
        </header>
    );
}

export default MainNavigation;