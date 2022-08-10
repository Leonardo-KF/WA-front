import { useEffect, useState } from "react";
import { movieApi } from "../services/movie-api";
import { Movie } from "../utils/types/movie";

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  async function GetMovies() {
    const movies = await movieApi.getMovies(page);
    setMovies(movies);
  }

  useEffect(() => {
    GetMovies();
  }, []);

  return (
    <div>
      {movies.map((movie) => {
        return <h1>{movie.title}</h1>;
      })}
    </div>
  );
}
