import { useEffect, useState, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";
let loadedIngredients;

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(firebaseDB_URL + "ingredients.json")
            .then((response) => response.json())
            .then((result) => {
                const formattedResult = [];
                for (const [id, item] of Object.entries(result)) {
                    formattedResult.push({
                        id,
                        ...item,
                    });
                }

                setIngredients((prev) => {
                    loadedIngredients = [...prev, ...formattedResult];
                    return loadedIngredients;
                });
            });
    }, []);

    useEffect(() => {
        console.log("RENDERING INGREDIENTS", ingredients);
    }, [ingredients]);

    const addIngredientHandler = (ingredient) => {
        fetch(firebaseDB_URL + "ingredients.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredient),
        })
            .then((response) => response.json())
            .then((result) => {
                setIngredients((prev) => [
                    ...prev,
                    { id: result.name, ...ingredient },
                ]);
            });
    };

    const filterHandler = useCallback((filterValue) => {
        if (filterValue === "") {
            setIngredients(loadedIngredients);
            return;
        }
        setIngredients(
            loadedIngredients.filter((item) => item.title.includes(filterValue))
        );
    }, []);

    const removeItemHandler = (id) => {
        fetch(firebaseDB_URL + `ingredients/${id}.json`, {
            method: "DELETE",
        }).then(() => {
            setIngredients((prev) => prev.filter((item) => item.id !== id));
        });
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} />

            <section>
                <Search onFilter={filterHandler} />
                <IngredientList
                    ingredients={ingredients}
                    onRemoveItem={removeItemHandler}
                />
            </section>
        </div>
    );
};

export default Ingredients;
