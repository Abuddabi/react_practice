import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
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
        setShowForm(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        props
            .onSubmitOrder({
                userData: userData,
                orderedItems: cartCtx.items,
                totalAmount: +cartCtx.totalAmount.toFixed(2),
            })
            .then(() => {
                setIsSubmitting(false);
                setDidSubmit(true);
                cartCtx.clearCart();
            });
    };

    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes["button--alt"]}>
                Close
            </button>
            {hasItems && (
                <button onClick={orderHandler} className={classes.button}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showForm && (
                <Checkout
                    onSubmit={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!showForm && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = <p>Successfully sent the order!</p>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
