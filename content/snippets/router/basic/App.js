import { HashRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Gallery";
import Detail from "./Detail";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/painting/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
}
