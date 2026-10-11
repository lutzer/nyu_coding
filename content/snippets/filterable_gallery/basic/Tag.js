export default function Tag(props) {
  const active = props.selected;
  return (
    <button
      className={active ? "tag active" : "tag"}
      onClick={() => props.onSelect(props.label)}
    >
      {props.label}
    </button>
  );
}
