import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
    const navigate = useNavigate();

    const closeHandler = () => navigate("..");

    return (
        <>
            <div className={classes.backdrop} onClick={closeHandler} />
            <dialog open className={classes.modal}>
                {props.children}
            </dialog>
        </>
    );
};

export default Modal;
