import { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

const swapiURL = "https://swapi.dev/api/";
const firebaseDB_URL =
    "https://react-practice-1-6bd4d-default-rtdb.firebaseio.com/";

function App() {
    const [filmList, setFilmList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(firebaseDB_URL + "movies.json");
            if (!response.ok) throw new Error("Something went wrong!");
            const data = await response.json();
            console.log(data);
            const loadedMovies = [];
            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }
            setFilmList(loadedMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    const addMovieHandler = async (movie) => {
        try {
            const response = await fetch(firebaseDB_URL + "movies.json", {
                method: "POST",
                body: JSON.stringify(movie),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
            fetchMoviesHandler();
        } catch (err) {
            console.error(err);
        }
    };

    const moviesContent = isLoading ? (
        <p>Movies are loading...</p>
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
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{moviesContent}</section>
        </>
    );
}

export default App;
