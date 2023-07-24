import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
    const items = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const cartItems = items.map((item) => (
        <CartItem key={item.id} item={item} />
    ));

    const content = items.length > 0 ? cartItems : <p>Empty</p>;

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>{content}</ul>
            {totalPrice > 0 && <p>Total price: ${totalPrice.toFixed(2)}</p>}
        </Card>
    );
};

export default Cart;
