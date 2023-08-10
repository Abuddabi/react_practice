import React, { useRef } from "react";

const NewTodo: React.FC<{ onAddTodo: (arg: string) => void }> = (props) => {
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            return;
        }

        props.onAddTodo(enteredText);
    };

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="todo">Todo text</label>
            <input ref={todoTextInputRef} type="text" name="todo" id="todo" />
            <button>Add Todo</button>
        </form>
    );
};

export default NewTodo;
