import { Link } from "react-router-dom";
import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <li onClick={props.onClick} className={classes.post}>
            <Link to={props.id}>
                <p className={classes.author}>{props.name}</p>
                <p className={classes.text}>{props.text}</p>
            </Link>
        </li>
    );
};

export default Post;
