import { useState } from "react";

import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

const Expenses = ({ expenses }) => {
    // console.log("----");
    const filterYears = ["2022", "2021", "2020", "2019"];
    const [filteredYear, setFilteredYear] = useState(filterYears[2]);

    const filteredExpenses = expenses.filter(
        (expense) => expense.date.getFullYear().toString() === filteredYear
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
            <ExpensesList filteredExpenses={filteredExpenses} />
        </Card>
    );
};

export default Expenses;
