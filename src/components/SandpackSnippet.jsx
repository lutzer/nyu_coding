import { useEffect, useMemo, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { loadSnippetFiles, snippetStorageKey, snippetConfigKey } from "./snippetFiles";

function safeReadJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeWriteJSON(key, value) {
  try {
    if (!value || Object.keys(value).length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    /* quota / privacy mode */
  }
}

function OpenPreviewButton({ folder, storageKey, pristineFiles, config }) {
  const { sandpack } = useSandpack();
  const onOpen = () => {
    const overlay = {};
    for (const [p, file] of Object.entries(sandpack.files)) {
      const pristine = pristineFiles[p];
      if (pristine === undefined) continue;
      if (file.code !== pristine) overlay[p] = file.code;
    }
    safeWriteJSON(storageKey, overlay);
    safeWriteJSON(snippetConfigKey(folder), config);
    const base = window.location.pathname + window.location.search;
    window.open(`${base}#/p/${folder}`, "_blank", "noopener");
  };
  return (
    <button type="button" onClick={onOpen} className="preview-button">
      Preview
    </button>
  );
}

function ResetButton({ storageKey, pristineFiles }) {
  const { sandpack } = useSandpack();
  const onReset = () => {
    safeWriteJSON(storageKey, null);
    sandpack.updateFile(pristineFiles);
  };
  return (
    <button
      type="button"
      onClick={onReset}
      className="reset-button"
    >
      Reset
    </button>
  );
}

function PersistenceBridge({ storageKey, pristineFiles }) {
  const { sandpack } = useSandpack();
  const timerRef = useRef(null);
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const overlay = {};
      for (const [p, file] of Object.entries(sandpack.files)) {
        const pristine = pristineFiles[p];
        if (pristine === undefined) continue;
        if (file.code !== pristine) overlay[p] = file.code;
      }
      safeWriteJSON(storageKey, overlay);
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [sandpack.files, storageKey, pristineFiles]);
  return null;
}

export function SandpackSnippet({
  folder,
  template = "react",
  activeFile,
  options,
  customSetup,
  theme,
}) {
  const pristineFiles = useMemo(() => loadSnippetFiles(folder), [folder]);
  const storageKey = snippetStorageKey(folder);

  const [initialFiles] = useState(() => {
    if (Object.keys(pristineFiles).length === 0) return {};
    const overlay = safeReadJSON(storageKey) ?? {};
    const out = {};
    for (const [p, code] of Object.entries(pristineFiles)) {
      const chosen = Object.prototype.hasOwnProperty.call(overlay, p)
        ? overlay[p]
        : code;
      out[p] = { code: chosen, active: p === activeFile };
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

  return (
    <SandpackProvider
      key={storageKey}
      template={template}
      files={initialFiles}
      customSetup={customSetup}
      theme={theme}
      options={{ ...options }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px 0",
        }}
      >
      </div>
      <SandpackLayout>
        <SandpackCodeEditor
          showLineNumbers
          style={{ height: options?.editorHeight ?? 360 }}
        />
        <SandpackPreview style={{ height: options?.editorHeight ?? 360 }} />
      </SandpackLayout>
      <div className="button-group">
        <ResetButton storageKey={storageKey} pristineFiles={pristineFiles} />
        <OpenPreviewButton
          folder={folder}
          storageKey={storageKey}
          pristineFiles={pristineFiles}
          config={{ template, customSetup }}
        />
      </div>
      <PersistenceBridge storageKey={storageKey} pristineFiles={pristineFiles} />
    </SandpackProvider>
  );
}
