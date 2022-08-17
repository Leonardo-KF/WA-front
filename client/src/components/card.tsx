import "./card.css";
import { Movie } from "../utils/types/movie";
export function Card(props: { movie: Movie }) {
  return (
    <div className="card-component">
      <img src={props.movie.banner} className="card-image" />
      <h2>{props.movie.title}</h2>
      <h3>{props.movie.producer}</h3>
    </div>
  );
}
