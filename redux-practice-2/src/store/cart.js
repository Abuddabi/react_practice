import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    showCart: false,
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggle(state) {
            state.showCart = !state.showCart;
        },
        add(state, action) {
            const { id, title, price } = action.payload;
            const foundProduct = state.items.find(product => product.id === id);

            if (foundProduct) {
                foundProduct.quantity++;
                foundProduct.total += foundProduct.price;
                const updatedProducts = state.items.map(product =>
                    product.id === foundProduct.id ? foundProduct : product
                );
                state.items = updatedProducts;
            } else {
                state.items = [
                    ...state.items,
                    {
                        id,
                        title,
                        price,
                        quantity: 1,
                        total: price,
                    }]
            }
        },
        increase(state, action) {
            const id = action.payload;
            const foundProduct = state.items.find(product => product.id === id);
            foundProduct.quantity++;
            foundProduct.total += foundProduct.price;
            const updatedProducts = state.items.map(product =>
                product.id === foundProduct.id ? foundProduct : product
            );
            state.items = updatedProducts;
        },
        decrease(state, action) {
            const id = action.payload;
            const foundProduct = state.items.find(product => product.id === id);
            let updatedProducts = [];
            if (foundProduct.quantity > 1) {
                foundProduct.quantity--;
                foundProduct.total -= foundProduct.price;
                updatedProducts = state.items.map(product =>
                    product.id === foundProduct.id ? foundProduct : product
                );
            } else {
                updatedProducts = state.items.filter((product) => product.id !== id);
            }

            state.items = updatedProducts;
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;