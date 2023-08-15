import { useState } from "react";
import classes from "./NewPost.module.css";

function NewPost(props) {
    const [enteredBody, setEnteredBody] = useState("");
    const [enteredAuthor, setEnteredAuthor] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        const postData = {
            body: enteredBody,
            author: enteredAuthor,
        };

        props.onAddPost(postData);
        props.onCloseModal();
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <p>
                <label htmlFor="body">Text</label>
                <textarea
                    id="body"
                    required
                    rows={3}
                    onChange={(e) => setEnteredBody(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    required
                    onChange={(e) => setEnteredAuthor(e.target.value)}
                />
            </p>
            <p className={classes.actions}>
                <button type="button" onClick={props.onCloseModal}>
                    Cancel
                </button>
                <button>Submit</button>
            </p>
        </form>
    );
}

export default NewPost;
