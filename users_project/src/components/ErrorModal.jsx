import Button from "./Button";
import classes from "./ErrorModal.module.css";
import Card from "./Card";

const ErrorModal = (props) => {
    const clickHandler = (e) => {
        let dataType = e.target.dataset.type;
        if (dataType === undefined) dataType = e.target.type;
        if (dataType === "backdrop" || dataType === "reset") props.onClick();
    };

    const modalClass = `${classes.backdrop} ${
        props.isActive ? "" : classes.inactive
    }`;

    return (
        <div data-type="backdrop" className={modalClass} onClick={clickHandler}>
            <div className={classes.modal}>
                <Card>
                    <div className={classes.header}>
                        <h2>Invalid Input</h2>
                    </div>
                    <div className={classes.content}>{props.message}</div>
                    <div className={classes.actions}>
                        <Button type="reset" onClick={clickHandler}>
                            Okay
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ErrorModal;
