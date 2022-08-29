import "./app.css";
import { useEffect, useState } from "react";
import { Card } from "../components/card/card";
import { movieApi } from "../services/movie-api";
import { Movie } from "../utils/types/movie";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxWidth: "500px",
    maxHeight: "100%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    border: "2px solid rgba(255, 0, 0, 0.5)",
    padding: "0px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
  },
};

Modal.setAppElement("#root");

export function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [numberPages, setNumberPages] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function changeModal() {
    setModalIsOpen(!modalIsOpen);
  }
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
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    GetMovies();
  }, [page]);

  return (
    <div className="page">
      <Header />
      <section className="main-page">
        {movies.map((movie) => {
          return (
            <button
              className="card-button"
              onClick={() => {
                setSelectedMovie(movie);
                changeModal();
              }}
            >
              <Card key={movie.id} movie={movie} />
            </button>
          );
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
              key={item}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={changeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="modal-close-section">
          <button className="btn-close" onClick={changeModal}>
            <MdClose size={28} color="red" />
          </button>
        </section>

        <section className="modal-card">
          <img
            className="card-image"
            src={selectedMovie?.banner}
            alt="banner"
          />
          <section className="modal-section">
            <span className="span-modal">Title:</span>
            <h3>{selectedMovie?.title}</h3>
          </section>
          <section className="modal-section">
            <span className="span-modal">Description:</span>
            <h3>{selectedMovie?.description}</h3>
          </section>
          <section className="modal-section">
            <span className="span-modal">Director:</span>
            <h3>{selectedMovie?.director}</h3>
          </section>
          <section className="modal-section">
            <span className="span-modal">Producer:</span>
            <h3>{selectedMovie?.producer}</h3>
          </section>
        </section>
      </Modal>
    </div>
  );
}
