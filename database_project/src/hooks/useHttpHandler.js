import { useState, useCallback } from "react";

const useHttpHandler = (fetchURL) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttp = useCallback(async (options = {}) => {
        setIsLoading(true);
        setError(null);
        let data = null;
        try {
            const response = await fetch(fetchURL, options);
            if (!response.ok) throw new Error("Request failed!");
            data = await response.json();
        } catch (err) {
            setError(err.message || "Something went wrong!");
            console.log(err.message);
        }
        setIsLoading(false);
        return data;
    }, [fetchURL]);

    return [sendHttp, isLoading, error];
}

export default useHttpHandler;