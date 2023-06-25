import { useState } from "react";

import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    const [openForm, setOpenForm] = useState(false);

    const formSubmitHandler = (formData) => {
        formData = { ...formData, id: Math.random().toString() };
        props.onAddExpense(formData);
        stopEditingHandler();
    };

    const startEditingHandler = () => setOpenForm(true);
    const stopEditingHandler = () => setOpenForm(false);

    let content = (
        <button onClick={startEditingHandler} type="button">
            Add New Expense
        </button>
    );

    if (openForm)
        content = (
            <ExpenseForm
                onCancel={stopEditingHandler}
                onFormSubmit={formSubmitHandler}
            />
        );

    return <div className="new-expense">{content}</div>;
};

export default NewExpense;
