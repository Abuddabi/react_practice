import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
    const [activeCart, setActiveCart] = useState(false);

    const showCartHandler = () => {
        setActiveCart(true);
    };

    const hideCartHandler = () => {
        setActiveCart(false);
    };

    return (
        <CartProvider>
            {activeCart && <Cart onClose={hideCartHandler} />}
            <Header onOpenCartClick={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
};

export default App;
