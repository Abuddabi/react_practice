import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = ({ fetchMeals }) => {
    const [meals, setMeals] = useState(null);

    useEffect(() => {
        fetchMeals().then((data) => {
            if (!data) {
                setMeals(false);
                return;
            }
            const loadedMeals = [];
            for (const mealKey in data) {
                const meal = data[mealKey];
                loadedMeals.push(
                    <MealItem
                        key={mealKey}
                        id={mealKey}
                        name={meal.name}
                        description={meal.description}
                        price={meal.price}
                    />
                );
            }
            setMeals(loadedMeals);
        });
    }, [fetchMeals]);

    const mealsContent =
        meals === null ? (
            <p>Loading...</p>
        ) : meals === false ? (
            <p className="error-text">Something went wrong.</p>
        ) : Array.isArray(meals) && meals.length === 0 ? (
            <p>No meals found.</p>
        ) : (
            meals
        );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsContent}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
