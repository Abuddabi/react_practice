import { useState } from "react";
import classes from "./AddUser.module.css";
import Button from "./Button";
import ErrorModal from "./ErrorModal";

const emptyFormData = {
    name: "",
    age: "",
};

const AddUser = (props) => {
    const [formData, setFormData] = useState(emptyFormData);
    const [invalidNames, setInvalidNames] = useState([]);
    const [activeModal, setActiveModal] = useState({ flag: false, text: "" });

    const submitHandler = (e) => {
        e.preventDefault();
        const valid = validation();
        if (valid) {
            props.onSubmit(formData);
            setFormData(emptyFormData);
        }
    };

    const changeHandler = (e) => {
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value,
        }));
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
            const empty = value.length === 0;
            const lessZero = name === "age" && +value <= 0;
            if (empty || lessZero) {
                let text;
                if (empty)
                    text =
                        "Please enter a valid name and age (non-empty values).";
                else if (lessZero) text = "Please enter a valid age (> 0).";

                isValid = false;
                invalidNames.push(name);
                setActiveModal({
                    flag: true,
                    text: text,
                });
            }
        }
        setInvalidNames(invalidNames);
        return isValid;
    };

    const isValidClass = (name) => {
        return invalidNames.includes(name) ? classes.invalid : "";
    };

    const modalClickHandler = () => setActiveModal(false);

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className={classes.input}>
                    <label className={isValidClass("name")}>
                        <span>Username</span>
                        <input
                            name="name"
                            onChange={changeHandler}
                            type="text"
                            value={formData.name || ""}
                        />
                    </label>
                    <label className={isValidClass("age")}>
                        <span>Age (Years)</span>
                        <input
                            name="age"
                            onChange={changeHandler}
                            type="text"
                            value={formData.age || ""}
                        />
                    </label>
                    <Button type="submit">Add User</Button>
                </div>
            </form>
            <ErrorModal
                onClick={modalClickHandler}
                isActive={activeModal.flag}
                message={activeModal.text}
            />
        </>
    );
};

export default AddUser;
