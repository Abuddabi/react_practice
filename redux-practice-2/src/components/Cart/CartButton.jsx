import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import classes from "./CartButton.module.css";

const CartButton = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.items.length);

    const clickHandler = () => {
        dispatch(uiActions.toggleCart());
    };

    return (
        <button onClick={clickHandler} className={classes.button}>
            <span>My Cart</span>
            <span className={classes.badge}>{cartCount}</span>
        </button>
    );
};

export default CartButton;
