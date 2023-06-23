import Concept from "./Concept";

const Concepts = ({ concepts }) => {
    return (
        <ul id="concepts">
            {concepts.map((item, id) => (
                <Concept key={id} concept={item} />
            ))}
        </ul>
    );
};

export default Concepts;
