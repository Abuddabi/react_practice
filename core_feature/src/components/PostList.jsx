import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";

const PostList = () => {
    const [enteredBody, setEnteredBody] = useState("");
    const [enteredAuthor, setEnteredAuthor] = useState("");

    const bodyChangeHandler = (e) => setEnteredBody(e.target.value);
    const authorChangeHandler = (e) => setEnteredAuthor(e.target.value);

    return (
        <>
            <NewPost
                onBodyChange={bodyChangeHandler}
                onAuthorChange={authorChangeHandler}
            />
            <ul className={classes.posts}>
                <Post
                    name={enteredAuthor || "Yegor"}
                    text={enteredBody || "React.js is good!"}
                />
                <Post name="Test" text="Test text" />
            </ul>
        </>
    );
};

export default PostList;
