import { Sandpack } from "@codesandbox/sandpack-react";

const rawSnippets = import.meta.glob("../snippets/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
});

function loadFolder(folder) {
  const prefix = `../snippets/${folder}/`;
  const files = {};
  for (const [path, content] of Object.entries(rawSnippets)) {
    if (!path.startsWith(prefix)) continue;
    const rel = "/" + path.slice(prefix.length);
    files[rel] = content;
  }
  return files;
}

export function SandpackSnippet({
  folder,
  template = "react",
  activeFile,
  options,
  customSetup,
  theme,
}) {
  const loaded = loadFolder(folder);
  if (Object.keys(loaded).length === 0) {
    return (
      <div style={{ padding: 12, border: "1px solid #f66", color: "#900" }}>
        No snippet files found in <code>src/snippets/{folder}/</code>
      </div>
    );
  }

  const files = {};
  for (const [path, content] of Object.entries(loaded)) {
    files[path] = { code: content, active: path === activeFile };
  }

  return (
    <Sandpack
      template={template}
      files={files}
      theme={theme}
      customSetup={customSetup}
      options={{ showLineNumbers: true, editorHeight: 360, ...options }}
    />
  );
}
