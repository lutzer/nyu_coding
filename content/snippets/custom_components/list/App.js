function Card(props) {
  return (
    <div className="card">
      <img src={props.src} alt="" />
      <p>{props.caption}</p>
    </div>
  );
}

const pictures = [
  { src: "https://picsum.photos/seed/one/200", caption: "One" },
  { src: "https://picsum.photos/seed/two/200", caption: "Two" },
  { src: "https://picsum.photos/seed/three/200", caption: "Three" },
];

export default function App() {
  return (
    <div>
      <h1>My Gallery</h1>
      {pictures.map((picture) => (
        <Card key={picture.caption} src={picture.src} caption={picture.caption} />
      ))}
    </div>
  );
}
