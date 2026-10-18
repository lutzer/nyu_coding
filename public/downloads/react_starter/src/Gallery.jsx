import { Link } from "react-router-dom";
import Hero from "./Hero";
import paintings from "./data.json";

export default function Gallery() {
  return (
    <>
      <Hero />
      <div className="gallery">
        {paintings.map((p, i) => (
          <Link key={p.title} to={`/painting/${i}`}>
            <img src={p.image} alt={p.title} />
          </Link>
        ))}
      </div>
    </>
  );
}
