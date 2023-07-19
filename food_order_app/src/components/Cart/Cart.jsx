import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const addItemHandler = (item) => cartCtx.addItem({ ...item, amount: 1 });
    const removeItemHandler = (id) => cartCtx.removeItem(id);

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={addItemHandler.bind(null, item)}
                    onRemove={removeItemHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const orderHandler = () => {
        props.onOrder({
            items: cartCtx.items,
            totalAmount: +cartCtx.totalAmount.toFixed(2),
        });
    };

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    onClick={props.onClose}
                    className={classes["button--alt"]}
                >
                    Close
                </button>
                {hasItems && (
                    <button onClick={orderHandler} className={classes.button}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;
