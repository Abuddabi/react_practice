import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

function Expenses({ expenses }) {
    return (
        <div className="expenses">
            {expenses.map((expense, index) => (
                <ExpenseItem expense={expense} key={index} />
            ))}
        </div>
    );
}

export default Expenses;
