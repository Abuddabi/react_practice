import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
    const changeHandler = (e) => {
        props.onChangeFilter(e.target.value);
    };

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <select value={props.selected} onChange={changeHandler}>
                    {props.filterYears.map((year, id) => (
                        <option key={id} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;
