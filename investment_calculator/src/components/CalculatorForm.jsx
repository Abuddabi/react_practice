import { useState } from "react";
import CalculatorInput from "./CalculatorInput";

const emptyFormData = {
    currentSavings: "",
    yearlySavings: "",
    expectedInterest: "",
    duration: "",
};

const CalculatorForm = (props) => {
    const [formData, setFormData] = useState(emptyFormData);
    const [invalidNames, setInvalidNames] = useState([]);

    const formChangeHandler = (name, value) => {
        setFormData((oldFormData) => ({ ...oldFormData, [name]: +value }));
        if (invalidNames.includes(name))
            setInvalidNames((prevState) =>
                prevState.filter((item) => item !== name)
            );
    };

    const validation = () => {
        let isValid = true;
        const invalidNames = [];
        for (const name in formData) {
            const value = formData[name].trim();
            if (value.length === 0 || +value <= 0) {
                isValid = false;
                invalidNames.push(name);
            }
        }
        setInvalidNames(invalidNames);
        return isValid;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const valid = validation();
        if (valid) props.onSubmit(formData);
    };

    const resetHandler = () => {
        props.onReset();
        setFormData(emptyFormData);
        setInvalidNames([]);
    };

    const isValidClass = (name) => {
        return invalidNames.includes(name) ? "invalid" : "";
    };

    const createCalculatorInput = (name, label) => {
        return (
            <CalculatorInput
                inputName={name}
                label={label}
                value={formData[name]}
                formOnChange={formChangeHandler}
                validClass={isValidClass(name)}
            />
        );
    };

    return (
        <form method="post" className="form" onSubmit={submitHandler}>
            <div className="input-group">
                {createCalculatorInput("currentSavings", "Current Savings ($)")}
                {createCalculatorInput("yearlySavings", "Yearly Savings ($)")}
            </div>
            <div className="input-group">
                {createCalculatorInput(
                    "expectedInterest",
                    "Expected Interest (%, per year)"
                )}
                {createCalculatorInput(
                    "duration",
                    "Investment Duration (years))"
                )}
            </div>
            <p className="actions">
                <button
                    onClick={resetHandler}
                    type="reset"
                    className="buttonAlt"
                >
                    Reset
                </button>
                <button type="submit" className="button">
                    Calculate
                </button>
            </p>
        </form>
    );
};

export default CalculatorForm;
