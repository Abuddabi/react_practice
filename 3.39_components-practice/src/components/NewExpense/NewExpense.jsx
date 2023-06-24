import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
    const formSubmitHandler = (formData) => {
        formData = { ...formData, id: Math.random().toString() };
        props.onAddExpense(formData);
    };

    return (
        <div className="new-expense">
            <ExpenseForm onFormSubmit={formSubmitHandler} />
        </div>
    );
};

export default NewExpense;
