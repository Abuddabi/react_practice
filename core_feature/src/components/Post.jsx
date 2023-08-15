import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <li className={classes.post}>
            <p className={classes.author}>{props.name}</p>
            <p className={classes.text}>{props.text}</p>
        </li>
    );
};

export default Post;
