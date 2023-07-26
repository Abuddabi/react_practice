import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

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
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (
            renderCount < 1 ||
            (process.env.NODE_ENV == "development" && renderCount < 2)
        ) {
            renderCount++;
            return;
        }

        if (cart.changed) dispatch(sendCartData(cart));
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
