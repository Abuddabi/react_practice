import { Outlet } from "react-router-dom";
import PostList from "../components/PostList";

function Posts() {
    return (
        <>
            <Outlet />
            <main>
                <PostList />
            </main>
        </>
    );
}

export default Posts;

const backendUrl = "http://localhost:8080/posts";

export async function loader() {
    const response = await fetch(backendUrl);
    const resData = await response.json();
    return resData.posts;
}
