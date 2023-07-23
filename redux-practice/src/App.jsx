import { useSelector } from "react-redux";

import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const content = isAuthenticated ? (
        <>
            <UserProfile />
            <Counter />
        </>
    ) : (
        <Auth />
    );

    return (
        <>
            <Header />
            {content}
        </>
    );
}

export default App;
