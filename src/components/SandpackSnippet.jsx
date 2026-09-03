import { useEffect, useMemo, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import {
  loadSnippetFiles,
  snippetConfigKey,
  safeWriteJSON,
  computeOverlay,
  mergeOverlay,
  loadOverlay,
  saveOverlay,
  clearOverlay,
  loadPreviewWindowRect,
} from "./snippetFiles";

function EditorButtons({ folder, pristineFiles, config }) {
  const { sandpack } = useSandpack();

  function onResetEditor() {
    clearOverlay(folder);
    sandpack.updateFile(pristineFiles);
  }

  function onOpenPreview() {
    saveOverlay(folder, computeOverlay(sandpack.files, pristineFiles));
    safeWriteJSON(snippetConfigKey(folder), config);
    const base = window.location.pathname + window.location.search;
    const rect = loadPreviewWindowRect();
    const width = rect?.width ?? 1200;
    const height = rect?.height ?? 800;
    const features = [`popup=yes`, `width=${width}`, `height=${height}`];
    if (Number.isFinite(rect?.left)) features.push(`left=${rect.left}`, `screenX=${rect.left}`);
    if (Number.isFinite(rect?.top)) features.push(`top=${rect.top}`, `screenY=${rect.top}`);
    window.open(`${base}#/p/${folder}`, "snippet-preview", features.join(","));
  }

  return (
    <div className="button-group">
      <button onClick={onResetEditor} className="reset-button">
        Reset
      </button>
      <button onClick={onOpenPreview} className="preview-button">
        Open Preview 
      </button>
    </div>
  );
}

function PersistenceBridge({ folder, pristineFiles }) {
  const { sandpack } = useSandpack();
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveOverlay(folder, computeOverlay(sandpack.files, pristineFiles));
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [sandpack.files, folder, pristineFiles]);
  return null;
}

export function SandpackSnippet({
  folder,
  template = "react",
  fullscreen = false,
  activeFile,
  options,
  customSetup,
  theme,
}) {
  const pristineFiles = useMemo(() => loadSnippetFiles(folder), [folder]);

  const [initialFiles] = useState(() => {
    if (Object.keys(pristineFiles).length === 0) return {};
    const merged = mergeOverlay(pristineFiles, loadOverlay(folder));
    const out = {};
    for (const [p, code] of Object.entries(merged)) {
      out[p] = { code, active: p === activeFile };
    }
    return out;
  });

  if (Object.keys(pristineFiles).length === 0) {
    return (
      <div style={{ padding: 12, border: "1px solid #f66", color: "#900" }}>
        No snippet files found in <code>src/snippets/{folder}/</code>
      </div>
    );
  }

  const editorHeight = fullscreen ? "90vh" : 360;
  const config = { template, customSetup };

  return (
    <SandpackProvider
      key={folder}
      template={template}
      files={initialFiles}
      customSetup={customSetup}
      theme={theme}
      options={{ ...options }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showLineNumbers style={{ height: editorHeight }} />
        <SandpackPreview style={{ height: editorHeight }} />
      </SandpackLayout>
      <EditorButtons
        folder={folder}
        pristineFiles={pristineFiles}
        config={config}
      />
      <PersistenceBridge folder={folder} pristineFiles={pristineFiles} />
    </SandpackProvider>
  );
}
