import classes from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            className={classes.button}
            type={props.type || "button"}
            onClick={(e) => (props.onClick ? props.onClick(e) : null)}
        >
            {props.children}
        </button>
    );
};

export default Button;
