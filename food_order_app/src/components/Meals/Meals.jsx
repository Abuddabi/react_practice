import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
    return (
        <>
            <MealsSummary />
            <AvailableMeals fetchMeals={props.fetchMeals} />
        </>
    );
};

export default Meals;
