import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App.jsx";
import { SandpackSnippet } from "./components/SandpackSnippet.jsx";
import "./styles.css";

const mdxComponents = { SandpackSnippet };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>
);
