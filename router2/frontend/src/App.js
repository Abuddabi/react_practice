import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventLayout from "./pages/EventLayout";
import ErrorPage from './pages/Error';
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuth, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "events",
                element: <EventLayout />,
                children: [
                    { index: true, element: <EventsPage />, loader: eventsLoader },
                    {
                        path: ":id", id: 'event-detail', loader: eventDetailLoader, children: [
                            { index: true, element: <EventDetailPage />, action: deleteEventAction },
                            { path: "edit", element: <EditEventPage />, action: manipulateEventAction, loader: checkAuth },
                        ]
                    },
                    { path: "new", element: <NewEventPage />, action: manipulateEventAction, loader: checkAuth },
                ]
            },
            { path: "newsletter", element: <NewsletterPage />, action: newsletterAction },
            { path: "auth", element: <AuthenticationPage />, action: authAction },
            { path: 'logout', action: logoutAction }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
