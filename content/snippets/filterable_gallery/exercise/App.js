import { useState } from "react";
import Faq from "./Faq";

const items = [
  { id: "what",  question: "What is React?",         answer: "A library for building user interfaces out of components." },
  { id: "why",   question: "Why use components?",    answer: "They let you reuse chunks of UI with different props." },
  { id: "state", question: "What is state?",         answer: "Values a component remembers between renders." },
  { id: "lift",  question: "What is lifting state?", answer: "Moving state up to the common parent so children can share it." },
];

export default function App() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="faq">
      {/* TODO: 
        1. wire the onToggle function 
          with setOpenId to propagate 
          the button click.
        2. change the isOpen condition so 
          it is only shown when the openId 
          is equal to the item.id */}
      {items.map((item) => (
        <Faq
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={true}
          onToggle={() => {}}
        />
      ))}
    </div>
  );
}
