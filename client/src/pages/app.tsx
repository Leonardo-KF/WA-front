import "./app.css";
import { useEffect, useState } from "react";
import { Card } from "../components/card/card";
import { movieApi } from "../services/movie-api";
import { Movie } from "../utils/types/movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

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
    <div className="page">
      <Header />
      <section className="main-page">
        {movies.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })}
      </section>
      <section className="footer-pagination">
        {page !== 1 ? (
          <button
            className="change-page-button"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <MdChevronLeft size={25} color={"whiteSmoke"} />
          </button>
        ) : null}
        {numberPages.map((item) => {
          return (
            <button
              className="pagination-button-number"
              style={{
                background:
                  item + 1 === page ? "red" : "rgba(255, 255, 255, 0.9)",
                transition: "ease-in-out .2s",
              }}
              onClick={() => {
                setPage(item + 1);
              }}
            >
              {item + 1}
            </button>
          );
        })}
        {numberPages.length >= page + 1 ? (
          <button
            className="change-page-button"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <MdChevronRight size={25} color={"whiteSmoke"} />
          </button>
        ) : null}
      </section>
      <Footer />
    </div>
  );
}
