import { useState, useCallback } from "react";

const useHttpHandler = (fetchURL, toRead = true) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttp = useCallback(async (requestConfig = {}) => {
        setIsLoading(true);
        setError(null);
        let data;
        try {
            const response = await fetch(fetchURL, requestConfig);
            if (!response.ok) throw new Error("Request failed!");
            data = await response.json();
        } catch (err) {
            setError(err.message || "Something went wrong!");
            console.log(err.message);
            data = null;
        }
        setIsLoading(false);
        return data;
    }, [fetchURL]);

    const read = useCallback(async () => {
        return await sendHttp();
    }, [sendHttp]);

    const write = useCallback(async (body) => {
        const requestConfig = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        }
        return await sendHttp(requestConfig);
    }, [sendHttp]);

    const result = [isLoading, error];
    if (toRead) result.unshift(read);
    // write
    else result.unshift(write);

    return result;
}

export default useHttpHandler;