import NewPost from "./NewPost";
import Post from "./Post";
import Modal from "./Modal";
import classes from "./PostList.module.css";
import { useEffect, useState } from "react";

const backendUrl = "http://localhost:8080/posts";

const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            try {
                const response = await fetch(backendUrl);
                const resData = await response.json();
                setPosts(resData.posts);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setIsFetching(false);
        })();
    }, []);

    const addPostHandler = (post) => {
        fetch(backendUrl, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setPosts((prev) => [post, ...prev]);
    };

    const deletePostHandler = (id) => {
        fetch(backendUrl, {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    let postsContent = "";
    if (isFetching) {
        postsContent = (
            <div style={{ textAlign: "center", color: "white" }}>
                <p>Loading posts...</p>
            </div>
        )   ;
    } else if (posts.length > 0) {
        postsContent = (
            <ul className={classes.posts}>
                {posts.map((post) => (
                    <Post
                        onClick={deletePostHandler.bind(null, post.id)}
                        key={post.body}
                        name={post.author}
                        text={post.body}
                    />
                ))}
            </ul>
        );
    } else if (posts.length === 0) {
        postsContent = (
            <div style={{ textAlign: "center", color: "white" }}>
                <h2>There are no posts yet.</h2>
                <p>Start adding some!</p>
            </div>
        );
    }

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
