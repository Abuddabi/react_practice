import { useRef, useContext } from "react";
import { TodosContext } from "../store/todos-context";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            return;
        }

        todosCtx.addTodo(enteredText);

        todoTextInputRef.current!.value = "";
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="todo">Todo text</label>
            <input ref={todoTextInputRef} type="text" name="todo" id="todo" />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
