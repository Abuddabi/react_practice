import { Link } from "react-router-dom";

const EventsPage = () => {
    return <>
        <h1>Events Page</h1>
        <ul>
            <li><Link to="e1">Event 1</Link></li>
            <li><Link to="e2">Event 2</Link></li>
            <li><Link to="e3">Event 3</Link></li>
        </ul>
    </>;
}

export default EventsPage;