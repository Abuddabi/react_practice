import { useEffect, useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttpHandler from "./hooks/useHttpHandler";

const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/tasks.json";

function App() {
    const [fetchTasks, isLoading, error] = useHttpHandler(firebaseDB_URL);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks().then((data) => {
            console.log(data);
            const loadedTasks = [];
            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }
            setTasks(loadedTasks);
        });
    }, [fetchTasks]);

    const taskAddHandler = (task) =>
        setTasks((prevTasks) => prevTasks.concat(task));

    return (
        <>
            <NewTask onTaskAdd={taskAddHandler} fetchURL={firebaseDB_URL} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </>
    );
}

export default App;
