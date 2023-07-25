import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui";

const PRODUCTS_DATA = [
    {
        id: "p1",
        title: "Test",
        description: "This is a first product - amazing!",
        price: 6,
    },
    {
        id: "p2",
        title: "Test 2",
        description: "This is another product - awesome!",
        price: 11,
    },
];

let renderCount = 0;

function App() {
    console.log(process.env.NODE_ENV);
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiActions.showNotification({
                    status: "pending",
                    title: "Sending...",
                    message: "Sending cart data.",
                })
            );
            const response = await fetch(
                "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/cart.json",
                { method: "PUT", body: JSON.stringify(cart) }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }

            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully.",
                })
            );
        };

        if (
            renderCount < 1 ||
            (process.env.NODE_ENV == "development" && renderCount < 2)
        ) {
            renderCount++;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: error.message,
                })
            );
        });
    }, [cart, dispatch]);

    return (
        <>
            {notification && <Notification {...notification} />}
            <Layout>
                {showCart && <Cart />}
                <Products items={PRODUCTS_DATA} />
            </Layout>
        </>
    );
}

export default App;
