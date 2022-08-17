import "./app.css";
import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { movieApi } from "../services/movie-api";
import { Movie } from "../utils/types/movie";

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [numberPages, setNumberPages] = useState<number[]>([]);

  async function GetMovies() {
    const movies = await movieApi.getMovies(page);

    setMovies(movies.movies);
    if (numberPages.length === 0 && movies.maxMovies > 10) {
      const pages = Array.from(
        Array(Math.ceil(movies.maxMovies / 10)),
        (item, index) => index
      );
      console.log("render");
      setNumberPages(pages);
    }
  }

  useEffect(() => {
    GetMovies();
  }, [page]);

  return (
    <div className="main-page">
      {movies.map((movie) => {
        return <Card key={movie.id} movie={movie} />;
      })}
      {numberPages.map((item) => {
        return (
          <button
            onClick={() => {
              setPage(item + 1);
            }}
          >
            {item + 1}
          </button>
        );
      })}
    </div>
  );
}
