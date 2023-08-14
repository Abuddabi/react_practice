import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";

const App = () => {
    const authCtx = useContext(AuthContext);

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     console.log("submit");
    // };

    // return (
    //     <form onSubmit={submitHandler}>
    //         <input type="text" />
    //         <button type="submit">Submit</button>
    //     </form>
    // );

    return <>{!authCtx.isAuth ? <Auth /> : <Ingredients />}</>;
};

export default App;
