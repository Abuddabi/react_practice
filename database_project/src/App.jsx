import { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

const swapiURL = "https://swapi.dev/api/";

function App() {
    const [filmList, setFilmList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(swapiURL + "films/");
            if (!response.ok) throw new Error("Something went wrong!");
            const data = await response.json();
            const transformedMovies = data.results.map((movieData) => ({
                id: movieData.episode_id,
                title: movieData.title,
                openingText: movieData.opening_crawl,
                releaseDate: movieData.release_date,
            }));
            setFilmList(transformedMovies);
        } catch (error) {
            setError(error.message);
        }
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
