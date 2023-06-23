import "./ExpenseDate.css";

function ExpenseDate({ date }) {
    const formatDate = (options) => date.toLocaleString("en-US", options);

    return (
        <div className="expense-date">
            <div className="expense-date__year">{date.getFullYear()}</div>
            <div className="expense-date__day">
                {formatDate({ day: "2-digit" })}
            </div>
            <div className="expense-date__month">
                {formatDate({ month: "long" })}
            </div>
        </div>
    );
}

export default ExpenseDate;
