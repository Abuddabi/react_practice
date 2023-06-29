import { useState } from "react";
import AddUser from "./components/AddUser";
import Card from "./components/Card";
import UsersList from "./components/UsersList";

function App() {
    const [users, setUsers] = useState([]);

    const addUserHandler = (newUser) => {
        setUsers((prevState) => [...prevState, newUser]);
    };

    return (
        <>
            <Card>
                <AddUser onSubmit={addUserHandler} />
            </Card>
            {users.length && (
                <Card>
                    <UsersList users={users} />
                </Card>
            )}
        </>
    );
}

export default App;
