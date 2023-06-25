import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ filteredExpenses }) => {
    let expensesContent = <p>No expenses found</p>;

    if (filteredExpenses.length > 0) {
        expensesContent = filteredExpenses.map((expense) => (
            <ExpenseItem expense={expense} key={expense.id} />
        ));
    }

    return <ul className="expenses-list">{expensesContent}</ul>;
};

export default ExpensesList;
