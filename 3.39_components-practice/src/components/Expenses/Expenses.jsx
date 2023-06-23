import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = ({ expenses }) => {
    return (
        <Card className="expenses">
            {expenses.map((expense, index) => (
                <ExpenseItem expense={expense} key={index} />
            ))}
        </Card>
    );
};

export default Expenses;
