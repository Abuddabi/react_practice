import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventLayout from "./pages/EventLayout";
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          { path: ":id", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ]
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
