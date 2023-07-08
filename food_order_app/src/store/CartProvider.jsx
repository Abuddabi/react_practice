import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    const getExistingIndex = (id) =>
        state.items.findIndex((item) => item.id === id);

    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;
        const existingIndex = getExistingIndex(action.item.id);
        const existingCartItem = state.items[existingIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        } else updatedItems = state.items.concat(action.item);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === "REMOVE") {
        const existingIndex = getExistingIndex(action.id);
        const existingCartItem = state.items[existingIndex];
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        }
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
