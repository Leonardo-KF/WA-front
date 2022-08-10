import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { movieApi } from "../services/movie-api";
import { Movie } from "../utils/types/movie";

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  async function GetMovies() {
    const movies = await movieApi.getMovies(page);
    setMovies(movies.movies);
  }

  useEffect(() => {
    GetMovies();
  }, [page]);

  return (
    <div>
      {movies.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
      })}
    </div>
  );
}
