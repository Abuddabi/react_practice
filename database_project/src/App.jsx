import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

const swapiURL = "https://swapi.dev/api/";

function App() {
    const [filmList, setFilmList] = useState([]);

    const fetchMoviesHandler = () => {
        fetch(swapiURL + "films/")
            .then((response) => response.json())
            .then((data) => {
                const filmList = data.results;
                console.log(filmList);
                setFilmList(filmList);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            {filmList.length > 0 && (
                <section>{<MoviesList movies={filmList} />}</section>
            )}
        </>
    );
}

export default App;
