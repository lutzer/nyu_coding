import { useState } from "react";

export default function App() {
  // TODO: add a piece of state called `visible` with an initial value of true.
  //       then wire the button's onClick to flip it: setVisible(!visible)

  return (
    <div>
      <button>Toggle</button>
      {visible && <img src="https://picsum.photos/300" alt="random" />}
    </div>
  );
}
