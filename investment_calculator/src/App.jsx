import { useState } from "react";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";
import CalculatorTable from "./components/CalculatorTable";

const App = () => {
    const [investmentData, setInvestmentData] = useState(null);

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const calculateHandler = (userInput) => {
        const yearlyData = []; // per-year results

        let totalSavings = +userInput["currentSavings"];
        const yearlySavings = +userInput["yearlySavings"];
        let investedCapital = totalSavings + yearlySavings;
        const expectedInterest = +userInput["expectedInterest"] / 100;
        const duration = +userInput["duration"];
        let totalInterest;
        let prevInterest;

        for (let i = 0; i < duration; i++) {
            const yearlyInterest = totalSavings * expectedInterest;
            totalInterest = yearlyInterest;
            if (i > 0) {
                totalInterest += prevInterest;
                investedCapital += yearlySavings;
            }
            totalSavings += yearlyInterest + yearlySavings;
            yearlyData.push({
                year: i + 1,
                totalSavings: formatter.format(totalSavings),
                yearlyInterest: formatter.format(yearlyInterest),
                totalInterest: formatter.format(totalInterest),
                investedCapital: formatter.format(investedCapital),
            });
            prevInterest = totalInterest;
        }

        setInvestmentData(yearlyData);
    };

    const resetHandler = () => {
        setInvestmentData(null);
    };

    return (
        <div>
            <Header />
            <CalculatorForm
                onSubmit={calculateHandler}
                onReset={resetHandler}
            />
            {!investmentData && (
                <p className="actions">No investment calculated yet.</p>
            )}
            {investmentData && (
                <CalculatorTable investmentData={investmentData} />
            )}
        </div>
    );
};

export default App;
