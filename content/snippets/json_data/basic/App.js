import paintings from "./data.json";

export default function App() {
  return (
    <div>
      <h1>Famous Paintings</h1>
      <ul className="gallery">
        {paintings.map((p) => (
          <li key={p.title}>
            <img src={p.image} alt={p.title} />
            <div>
              <strong>{p.title}</strong>
              <div className="meta">{p.artist} ({p.year})</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
