import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App.jsx";
import { SandpackSnippet } from "./components/SandpackSnippet.jsx";
import "./styles.css";

const mdxComponents = { SandpackSnippet };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </HashRouter>
  </React.StrictMode>
);
