import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = () => {
    const nameValidationFunc = (nameValue) => nameValue.trim() !== "";
    const [
        enteredName,
        enteredNameIsValid,
        nameHasError,
        nameChangeHandler,
        nameBlurHandler,
        resetNameInput,
    ] = useInput(nameValidationFunc);

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid =
        enteredEmailTouched && enteredEmail.includes("@");
    const formIsValid = enteredNameIsValid && enteredEmailIsValid;

    const emailInputChangeHandler = (e) => setEnteredEmail(e.target.value);
    const emailInputBlurHandler = () => setEnteredEmailTouched(true);

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!enteredNameIsValid || !enteredEmailIsValid) return;
        console.log(enteredName, enteredEmail);
        resetForm();
    };

    const resetForm = () => {
        resetNameInput();
        setEnteredEmailTouched(false);
        setEnteredEmail("");
    };

    const inputNameClasses = "form-control" + (nameHasError ? " invalid" : "");
    const inputEmailClasses =
        "form-control" +
        (enteredEmailTouched && !enteredEmailIsValid ? " invalid" : "");

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={inputNameClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    value={enteredName}
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameHasError && (
                    <p className="error-text">Name must not be empty.</p>
                )}
            </div>
            <div className={inputEmailClasses}>
                <label htmlFor="email">Your Email</label>
                <input
                    value={enteredEmail}
                    type="email"
                    id="email"
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                />
                {enteredEmailTouched && !enteredEmailIsValid && (
                    <p className="error-text">
                        Email should include <i>@</i> symbol.
                    </p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
