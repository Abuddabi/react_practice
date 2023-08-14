import { useReducer, useCallback } from "react";

const initialState = {
    isLoading: false,
    error: null,
    data: null,
    extra: null
};

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return { ...state, isLoading: true, data: null, extra: null };
        case "RESPONSE":
            return { ...state, isLoading: false, data: action.responseData, extra: action.extra };
        case "ERROR":
            return { ...state, isLoading: false, error: action.error };
        case "CLEAR":
            return initialState;
        default:
            throw new Error("No action type!");
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback((url, method, body = null, extra = null) => {
        dispatchHttp({ type: "SEND" });
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                dispatchHttp({ type: "RESPONSE", responseData, extra });

            })
            .catch((err) => {
                dispatchHttp({ type: "ERROR", error: `Something went wrong...  <br /><strong>Reason:</strong> ${err.message}` });
            });

    }, []);

    const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

    return { ...httpState, sendRequest, clear };
}

export default useHttp;