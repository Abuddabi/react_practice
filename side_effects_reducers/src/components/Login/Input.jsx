import classes from "./Input.module.css";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Input = (props) => {
    const { inputState, type, name, label, onChange, onBlur } = props;

    return (
        <div
            className={`${classes.control} ${
                inputState.isValid === false ? classes.invalid : ""
            }`}
        >
            <label htmlFor={name}>{label || capitalize(name)}</label>
            <input
                type={type || "text"}
                id={name}
                value={inputState.value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;
