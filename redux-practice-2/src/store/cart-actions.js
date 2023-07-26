import { uiActions } from './ui';
import { cartActions } from './cart';

const firebaseUrl = "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(firebaseUrl + 'cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const { items, totalAmount, totalPrice } = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: items || [],
                    totalAmount,
                    totalPrice
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const { items, totalAmount, totalPrice } = cart;
            const response = await fetch(
                firebaseUrl + 'cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items,
                        totalAmount,
                        totalPrice
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
            // setTimeout(() => {
            //     dispatch(uiActions.clearNotification());
            // }, 2000);
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    };
};