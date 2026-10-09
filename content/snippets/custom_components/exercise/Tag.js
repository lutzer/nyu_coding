const colors = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#e67e22",
];

export default function Tag(props) {
  const color = colors[props.label.charCodeAt(0) % colors.length];
  return (
    <div className="tag" style={{ backgroundColor: color }}>
      <span>#{props.label}</span>
    </div>
  );
}
