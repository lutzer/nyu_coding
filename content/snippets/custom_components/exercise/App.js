const colors = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#e67e22",
];

function Tag(props) {
  const color = colors[props.label.charCodeAt(0) % colors.length];
  return (
    <div className="tag" style={{ backgroundColor: color }}>
      <span>#{props.label}</span>
    </div>
  );
}

const topics = [
  "painting",
  "sculpture",
  "photography",
  "drawing",
  "ceramics",
  "architecture",
  "illustration",
  "collage",
  "graffiti",
  "mosaic",
  "calligraphy",
  "embroidery",
];

export default function App() {
  return (
    <div>
      <h1>Art Categories</h1>
      <div className="grid">
        {/* TODO: use topics.map(...) to render one <Tag /> per topic.
            Pass each topic as the `label` prop, and give each <Tag />
            a unique key. */}
      </div>
    </div>
  );
}
