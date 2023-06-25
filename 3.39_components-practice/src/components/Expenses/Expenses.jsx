import { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";

const Expenses = ({ allExpenses }) => {
    // console.log("----");
    const filterYears = [2022, 2021, 2020, 2019];
    const [filteredYear, setFilteredYear] = useState(filterYears[2]);

    const expenses = allExpenses.filter(
        (expense) => expense.date.getFullYear() == filteredYear
    );

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    };

    return (
        <Card className="expenses">
            <ExpensesFilter
                selected={filteredYear}
                filterYears={filterYears}
                onChangeFilter={filterChangeHandler}
            />
            {expenses.map((expense) => (
                <ExpenseItem expense={expense} key={expense.id} />
            ))}
        </Card>
    );
};

export default Expenses;
