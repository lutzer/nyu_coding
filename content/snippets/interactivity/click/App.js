export default function App() {
  function handleClick() {
    alert("You clicked the button!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
