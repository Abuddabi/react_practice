import React, { ReactNode, useState } from "react";
import Todo from "../components/models/todo";

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: number) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (text: string) => {
        text;
    },
    removeTodo: (id: number) => {
        id;
    },
});

const TodosContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        setTodos((prevState) => {
            return [...prevState, new Todo(text)];
        });
    };

    const removeTodoHandler = (id: number) => {
        setTodos((prevState) => {
            return [...prevState.filter((item) => item.id !== id)];
        });
    };

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;
