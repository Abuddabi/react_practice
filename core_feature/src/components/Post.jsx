import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <li onClick={props.onClick} className={classes.post}>
            <p className={classes.author}>{props.name}</p>
            <p className={classes.text}>{props.text}</p>
        </li>
    );
};

export default Post;
