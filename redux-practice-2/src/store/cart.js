import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
        totalPrice: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.items;
        },
        add(state, action) {
            const { id, title, price } = action.payload;
            const foundProduct = state.items.find(product => product.id === id);

            if (foundProduct) {
                foundProduct.quantity++;
                foundProduct.total += foundProduct.price;
                state.totalPrice += foundProduct.price;
            } else {
                state.items.push({
                    id,
                    title,
                    price,
                    quantity: 1,
                    total: price,
                });
                state.totalPrice += price;
            }
            state.totalAmount++;
            state.changed = true;
        },
        increase(state, action) {
            const id = action.payload;
            const foundProduct = state.items.find(product => product.id === id);
            foundProduct.quantity++;
            foundProduct.total += foundProduct.price;
            state.totalPrice += foundProduct.price;
            state.totalAmount++;
            state.changed = true;
        },
        decrease(state, action) {
            const id = action.payload;
            const foundProduct = state.items.find(product => product.id === id);
            if (foundProduct.quantity > 1) {
                foundProduct.quantity--;
                foundProduct.total -= foundProduct.price;
            } else {
                state.items = state.items.filter((product) => product.id !== id);
            }

            state.totalAmount--;
            state.totalPrice -= foundProduct.price;
            state.changed = true;
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;