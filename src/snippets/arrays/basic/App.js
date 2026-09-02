export default function App() {
  const items = [1, 2, 3, 4];
  return (
    <ul>
      {items.map((n) => (
        <li key={n}>{n * 2}</li>
      ))}
    </ul>
  );
}
