import useInput from "../hooks/use-input";

const BasicForm = () => {
    const [
        nameValue,
        nameIsValid,
        nameHasError,
        nameChangeHandler,
        nameBlurHandler,
        resetNameInput,
    ] = useInput((value) => value.trim() !== "");

    const [
        lastNameValue,
        lastNameIsValid,
        lastNameHasError,
        lastNameChangeHandler,
        lastNameBlurHandler,
        resetLastNameInput,
    ] = useInput((value) => value.trim() !== "");

    const [
        emailValue,
        emailIsValid,
        emailHasError,
        emailChangeHandler,
        emailBlurHandler,
        resetEmailInput,
    ] = useInput((value) => value.includes("@"));

    const formIsValid = nameIsValid && lastNameIsValid && emailIsValid;

    const submitHandler = (e) => {
        e.preventDefault();
        if (!formIsValid) return;

        console.log(nameValue, lastNameValue, emailValue);
        resetNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    const nameInputClasses = "form-control" + (nameHasError ? " invalid" : "");
    const lastNameInputClasses =
        "form-control" + (lastNameHasError ? " invalid" : "");
    const emailInputClasses =
        "form-control" + (emailHasError ? " invalid" : "");

    return (
        <form onSubmit={submitHandler}>
            <div className="control-group">
                <div className={nameInputClasses}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        value={nameValue}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                    />
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor="last">Last Name</label>
                    <input
                        type="text"
                        id="last"
                        value={lastNameValue}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="email"
                    id="email"
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
