import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

const backendUrl = "http://localhost:8080/posts";

const PostList = () => {
    const posts = useLoaderData();

    const deletePostHandler = (id) => {
        fetch(backendUrl, {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    let postsContent = "";
    if (posts.length > 0) {
        postsContent = (
            <ul className={classes.posts}>
                {posts.map((post) => (
                    <Post
                        onClick={deletePostHandler.bind(null, post.id)}
                        key={post.id}
                        id={post.id}
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

    return postsContent;
};

export default PostList;
