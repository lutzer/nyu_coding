export default function Tag(props) {
  const active = props.label === props.selected;
  return (
    // TODO: wire the onClick so clicking this button calls
    //       props.onSelect(props.label) — that's how the parent
    //       finds out which tag was clicked.
    <button className={active ? "tag active" : "tag"}>
      {props.label}
    </button>
  );
}
