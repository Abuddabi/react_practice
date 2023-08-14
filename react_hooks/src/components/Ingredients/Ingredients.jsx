import { useReducer, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";
let loadedIngredients = [];

const ingredientsReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredients;
        case "ADD":
            loadedIngredients = [...state, action.ingredient];
            return loadedIngredients;
        case "DELETE":
            loadedIngredients = state.filter((item) => item.id !== action.id);
            return loadedIngredients;
        default:
            throw new Error("No action type!");
    }
};

const httpReducer = (state, action) => {
    switch (action.type) {
        case "SEND":
            return { ...state, isLoading: true };
        case "RESPONSE":
            return { ...state, isLoading: false };
        case "ERROR":
            return { ...state, isLoading: false, error: action.error };
        default:
            throw new Error("No action type!");
    }
};

const Ingredients = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, null);
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        dispatchHttp({ type: "SEND" });
        fetch(firebaseDB_URL + "ingredients.json")
            .then((response) => response.json())
            .then((result) => {
                dispatchHttp({ type: "RESPONSE" });
                for (const [id, item] of Object.entries(result)) {
                    loadedIngredients.push({
                        id,
                        ...item,
                    });
                }

                dispatch({
                    type: "SET",
                    ingredients: loadedIngredients,
                });
            })
            .catch((err) => {
                dispatchHttp({ type: "ERROR", error: err.message });
            });
    }, []);

    useEffect(() => {
        console.log("RENDERING INGREDIENTS", ingredients);
    }, [ingredients]);

    const addIngredientHandler = useCallback((ingredient) => {
        dispatchHttp({ type: "SEND" });
        fetch(firebaseDB_URL + "ingredients.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredient),
        })
            .then((response) => response.json())
            .then((result) => {
                dispatchHttp({ type: "RESPONSE" });
                dispatch({
                    type: "ADD",
                    ingredient: { id: result.name, ...ingredient },
                });
            })
            .catch((err) => {
                dispatchHttp({ type: "ERROR", error: err.message });
            });
    }, []);

    const filterHandler = useCallback(
        (filterValue) => {
            if (filterValue === "") {
                console.log("filter", ingredients, loadedIngredients);
                if (ingredients !== null && ingredients !== loadedIngredients) {
                    console.log(
                        "filter action",
                        ingredients,
                        loadedIngredients
                    );
                    dispatch({ type: "SET", ingredients: loadedIngredients });
                }
                return;
            }
            dispatch({
                type: "SET",
                ingredients: loadedIngredients.filter((item) =>
                    item.title.includes(filterValue)
                ),
            });
        },
        [ingredients]
    );

    const removeItemHandler = useCallback((id) => {
        dispatchHttp({ type: "SEND" });
        fetch(firebaseDB_URL + `ingredients/${id}.json`, {
            method: "DELETE",
        })
            .then(() => {
                dispatchHttp({ type: "RESPONSE" });
                dispatch({ type: "DELETE", id });
            })
            .catch((err) => {
                dispatchHttp({ type: "ERROR", error: err.message });
            });
    }, []);

    const clearError = useCallback(
        () => dispatchHttp({ type: "ERROR", error: null }),
        []
    );

    return (
        <div className="App">
            {httpState.error && (
                <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
            )}

            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={httpState.isLoading}
            />

            <section>
                <Search onFilter={filterHandler} />
                {ingredients && (
                    <IngredientList
                        ingredients={ingredients}
                        onRemoveItem={removeItemHandler}
                    />
                )}
            </section>
        </div>
    );
};

export default Ingredients;
