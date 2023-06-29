import classes from "./UsersList.module.css";

const UsersList = ({ users }) => {
    return (
        <div className={classes.users}>
            <ul>
                {users.map((user, index) => (
                    <li
                        key={index}
                    >{`${user.name} (${user.age} years old)`}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
