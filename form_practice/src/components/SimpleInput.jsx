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

    const emailValidationFunc = (emailValue) => emailValue.includes("@");
    const [
        enteredEmail,
        enteredEmailIsValid,
        emailHasError,
        emailChangeHandler,
        emailBlurHandler,
        resetEmailInput,
    ] = useInput(emailValidationFunc);

    const formIsValid = enteredNameIsValid && enteredEmailIsValid;

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!enteredNameIsValid || !enteredEmailIsValid) return;
        console.log(enteredName, enteredEmail);
        resetNameInput();
        resetEmailInput();
    };

    const inputNameClasses = "form-control" + (nameHasError ? " invalid" : "");
    const inputEmailClasses =
        "form-control" + (emailHasError ? " invalid" : "");

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
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailHasError && (
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
