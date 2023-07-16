import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

const swapiURL = "https://swapi.dev/api/";

function App() {
    const [filmList, setFilmList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = () => {
        setIsLoading(true);
        setError(null);
        fetch(swapiURL + "films/")
            .then((response) => {
                if (!response.ok) throw new Error("Something went wrong!");
                else return response.json();
            })
            .then((data) => {
                const transformedMovies = data.results.map((movieData) => ({
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                }));
                setFilmList(transformedMovies);
                console.log(transformedMovies);
            })
            .catch((er) => {
                console.error(er.message);
                setError(er.message);
            });

        setIsLoading(false);
    };

    const moviesContent = isLoading ? (
        <p>Loading...</p>
    ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
    ) : filmList.length > 0 ? (
        <MoviesList movies={filmList} />
    ) : (
        // if !isLoading && !error && !filmList > 0
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
