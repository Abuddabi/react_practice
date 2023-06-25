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
            let dateDay = oldDate.toLocaleString("en-US", { day: "2-digit" });
            let dateMonth =
                oldDate.toLocaleString("en-US", { month: "numeric" }) - 1;

            return new Date(oldDate.getFullYear(), dateMonth, ++dateDay);
        });
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
