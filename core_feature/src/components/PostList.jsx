import NewPost from "./NewPost";
import Post from "./Post";
import Modal from "./Modal";
import classes from "./PostList.module.css";
import { useState } from "react";

const PostList = (props) => {
    const [posts, setPosts] = useState([
        // {
        //     body: "React.js is good!",
        //     author: "Yegor",
        // },
        // {
        //     body: "Test text",
        //     author: "Test",
        // },
    ]);

    const addPostHandler = (post) => {
        setPosts((prev) => [...prev, post]);
    };

    const deletePostHandler = (id) => {
        setPosts((prev) => prev.filter((post) => post.body !== id));
    };

    const postsContent =
        posts.length > 0 ? (
            <ul className={classes.posts}>
                {posts.map((post) => (
                    <Post
                        onClick={deletePostHandler.bind(null, post.body)}
                        key={post.body}
                        name={post.author}
                        text={post.body}
                    />
                ))}
            </ul>
        ) : (
            <div style={{ textAlign: "center", color: "white" }}>
                <h2>There are no posts yet.</h2>
                <p>Start adding some!</p>
            </div>
        );

    return (
        <>
            {props.isPosting && (
                <Modal onClose={props.onStopPosting}>
                    <NewPost
                        onAddPost={addPostHandler}
                        onCloseModal={props.onStopPosting}
                    />
                </Modal>
            )}
            {postsContent}
        </>
    );
};

export default PostList;
