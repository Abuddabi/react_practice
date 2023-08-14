import { useReducer, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

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

const Ingredients = () => {
    const [ingredients, dispatch] = useReducer(ingredientsReducer, null);
    const {
        isLoading,
        error,
        data,
        extra: httpExtra,
        sendRequest,
        clear: clearError,
    } = useHttp();

    useEffect(() => {
        sendRequest(firebaseDB_URL + "ingredients.json", "GET", null, {
            type: "SET",
        });
    }, [sendRequest]);

    useEffect(() => {
        if (isLoading || error || !httpExtra) return;

        let dispatchObj = {};
        if (httpExtra.type === "SET") {
            for (const [id, item] of Object.entries(data)) {
                loadedIngredients.push({
                    id,
                    ...item,
                });
            }
            dispatchObj.ingredients = loadedIngredients;
        } else if (httpExtra.type === "ADD")
            dispatchObj.ingredient = { id: data.name, ...httpExtra.data };
        else if (httpExtra.type === "DELETE") dispatchObj.id = httpExtra.data;
        dispatchObj.type = httpExtra.type;

        dispatch(dispatchObj);
    }, [data, isLoading, error, httpExtra]);

    useEffect(() => {
        console.log("RENDERING INGREDIENTS", ingredients);
    }, [ingredients]);

    const addIngredientHandler = useCallback(
        (ingredient) => {
            sendRequest(
                firebaseDB_URL + "ingredients.json",
                "POST",
                JSON.stringify(ingredient),
                { type: "ADD", data: ingredient }
            );
        },
        [sendRequest]
    );

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

    const removeItemHandler = useCallback(
        (id) => {
            const url = firebaseDB_URL + `ingredients/${id}.json`;
            sendRequest(url, "DELETE", null, { type: "DELETE", data: id });
        },
        [sendRequest]
    );

    return (
        <div className="App">
            {error && (
                <ErrorModal onClose={clearError}>
                    <span dangerouslySetInnerHTML={{ __html: error }}></span>
                </ErrorModal>
            )}

            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={isLoading}
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
