import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttpHandler from "../../hooks/useHttpHandler";

const NewTask = (props) => {
    const [writeTask, isLoading, error] = useHttpHandler(props.fetchURL, false);

    const enterTaskHandler = (taskText) => {
        writeTask({ text: taskText }).then((data) => {
            const generatedId = data.name;
            const createdTask = { id: generatedId, text: taskText };
            props.onTaskAdd(createdTask);
        });
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
