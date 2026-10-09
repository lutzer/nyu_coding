import Tag from "./Tag";

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
        <Tag label="test"/>
        {/* TODO: remove the single tag and use topics.map(...) to render one <Tag /> per topic.
            Pass each topic as the `label` prop, and give each <Tag />
            a unique key. */}
      </div>
    </div>
  );
}
