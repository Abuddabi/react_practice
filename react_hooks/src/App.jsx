import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";

const App = () => {
    const authCtx = useContext(AuthContext);

    return <>{!authCtx.isAuth ? <Auth /> : <Ingredients />}</>;
};

export default App;
