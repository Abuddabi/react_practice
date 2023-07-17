import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

const swapiURL = "https://swapi.dev/api/";
const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(firebaseDB_URL + "tasks.json");
            if (!response.ok) throw new Error("Request failed!");
            const data = await response.json();
            const loadedTasks = [];
            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }
            setTasks(loadedTasks);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <>
            <NewTask onAddTask={taskAddHandler} />
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
