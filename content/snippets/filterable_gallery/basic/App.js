import { useState } from "react";

function Tag(props) {
  const active = props.label === props.selected;
  return (
    <button
      className={active ? "tag active" : "tag"}
      onClick={() => props.onSelect(props.label)}
    >
      {props.label}
    </button>
  );
}

const tags = ["all", "painting", "sculpture", "photography"];

const pictures = [
  { src: "https://picsum.photos/seed/paint1/200", topic: "painting"    },
  { src: "https://picsum.photos/seed/paint2/200", topic: "painting"    },
  { src: "https://picsum.photos/seed/sculpt1/200", topic: "sculpture"   },
  { src: "https://picsum.photos/seed/sculpt2/200", topic: "sculpture"   },
  { src: "https://picsum.photos/seed/photo1/200", topic: "photography" },
  { src: "https://picsum.photos/seed/photo2/200", topic: "photography" },
];

export default function App() {
  const [selected, setSelected] = useState("all");

  const visible = pictures.filter(
    (p) => selected === "all" || p.topic === selected
  );

  return (
    <div>
      <div className="tags">
        {tags.map((t) => (
          <Tag key={t} label={t} selected={selected} onSelect={setSelected} />
        ))}
      </div>
      <div className="gallery">
        {visible.map((p) => (
          <img key={p.src} src={p.src} alt={p.topic} />
        ))}
      </div>
    </div>
  );
}
