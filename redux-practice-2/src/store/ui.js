import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    showCart: false,
    notification: null
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            const { status, title, message } = action.payload;
            state.notification = { status, title, message };
        },
        clearNotification(state) {
            state.notification = null
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;