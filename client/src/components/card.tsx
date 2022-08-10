import { Movie } from "../utils/types/movie";
import "./card.css";
export function Card(props: { movie: Movie }) {
  return (
    <div>
      <img src={props.movie.banner} height="150px" width="300px" />
      <h2>{props.movie.title}</h2>
      <h4>{props.movie.description}</h4>
    </div>
  );
}
