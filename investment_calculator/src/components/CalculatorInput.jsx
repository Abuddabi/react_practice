const CalculatorInput = ({
    inputName,
    label,
    value,
    formOnChange,
    validClass,
}) => {
    const changeHandler = (e) => {
        formOnChange(e.target.name, e.target.value);
    };

    return (
        <p>
            <label className={validClass} htmlFor={inputName}>
                {label}
            </label>
            <input
                type="number"
                id={inputName}
                name={inputName}
                value={value || ""}
                onChange={changeHandler}
                className={validClass}
            />
        </p>
    );
};

export default CalculatorInput;
