import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import "./App.css";

const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";

const App = () => {
    const [activeCart, setActiveCart] = useState(false);

    const showCartHandler = () => {
        setActiveCart(true);
    };

    const hideCartHandler = () => {
        setActiveCart(false);
    };

    const submitOrderHandler = (orderData) => {
        return fetch(firebaseDB_URL + "orders.json", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => data) // return
            .catch((err) => {
                console.error(err.message);
            });
    };

    const fetchMeals = async () => {
        try {
            const response = await fetch(firebaseDB_URL + "meals.json");
            return await response.json();
        } catch (err) {
            console.error(err.message);
            return null;
        }
    };

    return (
        <CartProvider>
            {activeCart && (
                <Cart
                    onClose={hideCartHandler}
                    onSubmitOrder={submitOrderHandler}
                />
            )}
            <Header onOpenCartClick={showCartHandler} />
            <main>
                <Meals fetchMeals={fetchMeals} />
            </main>
        </CartProvider>
    );
};

export default App;
