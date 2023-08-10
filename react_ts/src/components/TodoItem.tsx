import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
    id: number;
    text: string;
    onClick: (id: number) => void;
}> = (props) => {
    return (
        <li onClick={() => props.onClick(props.id)} className={classes.item}>
            {props.text}
        </li>
    );
};

export default TodoItem;
