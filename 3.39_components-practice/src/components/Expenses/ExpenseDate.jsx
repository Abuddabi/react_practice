import "./ExpenseDate.css";

const ExpenseDate = ({ date }) => {
    const formatDate = (options) => date.toLocaleString("en-US", options);
    const getDay = () => formatDate({ day: "2-digit" });
    const getMonth = () => formatDate({ month: "long" });

    return (
        <div className="expense-date">
            <div className="expense-date__year">{date.getFullYear()}</div>
            <div className="expense-date__day">{getDay()}</div>
            <div className="expense-date__month">{getMonth()}</div>
        </div>
    );
};

export default ExpenseDate;
