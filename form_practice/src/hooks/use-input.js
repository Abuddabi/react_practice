import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = isTouched && !valueIsValid;

    const valueChangeHandler = (e) => setEnteredValue(e.target.value);
    const inputBlurHandler = () => setIsTouched(true);

    const resetInput = () => {
        setIsTouched(false);
        setEnteredValue("");
    }

    return [
        enteredValue,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetInput
    ];
}

export default useInput;