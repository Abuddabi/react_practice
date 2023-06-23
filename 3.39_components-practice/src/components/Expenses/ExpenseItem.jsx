import { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = ({ expense }) => {
    const { title, amount } = expense;
    const [date, setDate] = useState(expense.date);

    const clickHandler = () => {
        setDate(() => {
            let dateDay = date.toLocaleString("en-US", { day: "2-digit" });
            let dateMonth =
                date.toLocaleString("en-US", { month: "numeric" }) - 1;

            return new Date(2020, dateMonth, ++dateDay);
        });
        console.log(date.toLocaleDateString());
    };

    return (
        <Card className="expense-item">
            <ExpenseDate date={date} />
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${amount}</div>
            </div>
            <button onClick={clickHandler}>Change Date</button>
        </Card>
    );
};

export default ExpenseItem;
