import { useEffect, useState } from "react";

const Async = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <div>
            <ul style={{ textAlign: "left" }}>
                {posts.map((post, index) => (
                    <li style={{ listStyle: "none" }} key={post.id}>
                        {index + 1} - {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Async;
