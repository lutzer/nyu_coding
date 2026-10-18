import { Link, useParams } from "react-router-dom";
import paintings from "./data.json";

export default function Detail() {
  const { id } = useParams();
  const painting = paintings[id];

  return (
    <div className="detail">
      <Link to="/">← Back to gallery</Link>
      <h1>{painting.title}</h1>
      <img src={painting.image} alt={painting.title} />
      <p>
        by {painting.artist}, {painting.year}
      </p>
    </div>
  );
}
