import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ filteredExpenses }) => {
    if (filteredExpenses.length === 0) {
        return <p>No expenses found</p>;
    }

    return (
        <ul className="expenses-list">
            {filteredExpenses.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
            ))}
        </ul>
    );
};

export default ExpensesList;
