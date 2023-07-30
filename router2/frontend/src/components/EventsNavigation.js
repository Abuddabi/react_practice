import { NavLink, useRouteLoaderData } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const isActive = ({ isActive }) => isActive ? classes.active : undefined;
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events" className={isActive} end>All Events</NavLink>
          </li>
          {token &&
            <li>
              <NavLink to="/events/new" className={isActive}>New Event</NavLink>
            </li>}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
