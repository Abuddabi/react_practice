const TableRow = ({ yearInfo }) => {
    return (
        <tr>
            {Object.keys(yearInfo).map((key, index) => (
                <td key={index}>{yearInfo[key]}</td>
            ))}
        </tr>
    );
};

export default TableRow;
