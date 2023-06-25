import { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = ({ expenses }) => {
    const years = [2022, 2021, 2020, 2019];
    const [filteredYear, setFilteredYear] = useState(years[2]);

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
        console.log(selectedYear);
    };

    return (
        <Card className="expenses">
            <ExpensesFilter
                selected={filteredYear}
                years={years}
                onChangeFilter={filterChangeHandler}
            />
            {expenses.map((expense, index) => (
                <ExpenseItem expense={expense} key={index} />
            ))}
        </Card>
    );
};

export default Expenses;
