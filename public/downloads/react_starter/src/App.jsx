import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Detail from "./Detail";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/painting/:id" element={<Detail />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
