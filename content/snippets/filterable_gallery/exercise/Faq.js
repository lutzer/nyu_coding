export default function Faq(props) {
  return (
    <div className={props.isOpen ? "faq-item open" : "faq-item"}>
      <button
        className="faq-question"
        onClick={() => props.onToggle(props.id)}
      >
        {props.question}
      </button>
      {props.isOpen && <p className="faq-answer">{props.answer}</p>}
    </div>
  );
}
