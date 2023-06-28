import TableRow from "./TableRow";

const CalculatorTable = (props) => {
    return (
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {props.investmentData.map((data, index) => (
                    <TableRow key={index} yearInfo={data} />
                ))}
            </tbody>
        </table>
    );
};

export default CalculatorTable;
