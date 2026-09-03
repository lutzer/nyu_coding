import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  SandpackProvider,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { loadSnippetFiles, readOverlay, readSnippetConfig } from "./snippetFiles";

export default function FullscreenPreview() {
  const params = useParams();
  const folder = params["*"] || "";

  const files = useMemo(() => {
    const pristine = loadSnippetFiles(folder);
    const overlay = readOverlay(folder);
    const out = {};
    for (const [p, code] of Object.entries(pristine)) {
      out[p] = Object.prototype.hasOwnProperty.call(overlay, p)
        ? overlay[p]
        : code;
    }
    return out;
  }, [folder]);

  const { template = "react", customSetup } = readSnippetConfig(folder);

  if (Object.keys(files).length === 0) {
    return (
      <div style={{ padding: 24, color: "#900" }}>
        No snippet files found for <code>{folder}</code>.
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <SandpackProvider template={template} customSetup={customSetup} files={files}>
        <SandpackPreview
          style={{ height: "100vh", width: "100vw", border: 0 }}
          showOpenInCodeSandbox={false}
        />
      </SandpackProvider>
    </div>
  );
}
