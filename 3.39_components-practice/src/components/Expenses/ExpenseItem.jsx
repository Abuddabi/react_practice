import { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = ({ expense }) => {
    const { title, amount } = expense;
    const [date, setDate] = useState(expense.date);
    // console.log(
    //     expense.date.toISOString().split("T")[0],
    //     date.toISOString().split("T")[0]
    // );

    const clickHandler = () => {
        setDate((oldDate) => {
            return new Date(
                oldDate.getFullYear(),
                oldDate.getMonth(),
                oldDate.getDate() + 1
            );
        });
    };

    return (
        <li>
            <Card className="expense-item">
                <ExpenseDate date={date} />
                <div className="expense-item__description">
                    <h2>{title}</h2>
                    <div className="expense-item__price">${amount}</div>
                </div>
                <button onClick={clickHandler}>Change Date</button>
            </Card>
        </li>
    );
};

export default ExpenseItem;
