import { useState } from "react";
import Tag from "./Tag";
import Card from "./Card";
import pictures from "./data.json";

const tags = ["all", "painting", "sculpture", "photography"];

export default function App() {
  const [selected, setSelected] = useState("all");

  const visible = pictures.filter(
    (p) => selected === "all" || p.topic === selected
  );

  return (
    <div>
      <div className="tags">
        {tags.map((t) => (
          <Tag key={t} label={t} selected={selected===t} onSelect={setSelected} />
        ))}
      </div>
      <div className="gallery">
        {visible.map((p) => (
          <Card key={p.title} image={p.image} title={p.title} />
        ))}
      </div>
    </div>
  );
}
