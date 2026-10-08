function Card() {
  return (
    <div className="card">
      <img src="https://picsum.photos/200" alt="" />
      <p>A random picture.</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>My Gallery</h1>
      <Card />
      <Card />
      <Card />
    </div>
  );
}
