import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

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

function App() {
    const showCart = useSelector((state) => state.ui.showCart);

    return (
        <Layout>
            {showCart && <Cart />}
            <Products items={PRODUCTS_DATA} />
        </Layout>
    );
}

export default App;
