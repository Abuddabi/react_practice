import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

const swapiURL = "https://swapi.dev/api/";

function App() {
    const [filmList, setFilmList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoviesHandler = () => {
        setIsLoading(true);
        fetch(swapiURL + "films/")
            .then((response) => response.json())
            .then((data) => {
                const transformedMovies = data.results.map((movieData) => ({
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                }));
                setFilmList(transformedMovies);
                console.log(transformedMovies);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    };

    const moviesContent = isLoading ? (
        <p>Loading...</p>
    ) : filmList.length > 0 ? (
        <MoviesList movies={filmList} />
    ) : (
        <p>Found no movies.</p>
    );

    return (
        <>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{moviesContent}</section>
        </>
    );
}

export default App;
