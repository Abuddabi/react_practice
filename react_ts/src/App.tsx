import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import Todo from "./components/models/todo";

import { useState } from "react";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        setTodos((prevState) => {
            return [...prevState, new Todo(text)];
        });
    };

    return (
        <>
            <NewTodo onAddTodo={addTodoHandler} />
            <Todos items={todos} />
        </>
    );
}

export default App;
