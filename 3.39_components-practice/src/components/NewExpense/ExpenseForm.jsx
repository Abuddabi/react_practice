import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const emptyFormData = { title: "", amount: "", date: "" };
    const [formData, setFormData] = useState(emptyFormData);

    const formChangeHandler = (e, valueName) => {
        setFormData((prevState) => {
            let newFormData = { ...prevState };
            newFormData[valueName] = e.target.value;

            return newFormData;
        });
    };

    const submitHandler = (e) => {
        const dateHandler = (dateString) => {
            const [year, month, day] = dateString.split("-").map(Number);
            return new Date(year, month - 1, day);
        };

        e.preventDefault();
        formData.date = dateHandler(formData.date);
        formData.amount = +formData.amount;
        props.onFormSubmit(formData);
        setFormData(emptyFormData);
    };

    const cancelHandler = () => {
        setFormData(emptyFormData);
        props.onCancel();
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        onChange={(e) => formChangeHandler(e, "title")}
                        value={formData.title}
                    />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="">Amount</label>
                    <input
                        type="number"
                        onChange={(e) => formChangeHandler(e, "amount")}
                        value={formData.amount}
                        min="0.01"
                        step="0.01"
                    />
                </div>
                <div className="new-expense__control">
                    <label htmlFor="">Date</label>
                    <input
                        type="date"
                        onChange={(e) => formChangeHandler(e, "date")}
                        value={formData.date}
                        min="2019-01-01"
                        max="2022-12-31"
                    />
                </div>
            </div>
            <div className="new-expense__actions">
                <button onClick={cancelHandler} type="reset">
                    Cancel
                </button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
