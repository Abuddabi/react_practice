import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
    const isActive = ({ isActive }) => (isActive ? classes.active : undefined);

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/" className={isActive}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="products" className={isActive}>
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
