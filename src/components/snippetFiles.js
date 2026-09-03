const rawSnippets = import.meta.glob("../snippets/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function snippetStorageKey(folder) {
  return `sandpack-snippet:v1:${folder}`;
}

export function loadSnippetFiles(folder) {
  const prefix = `../snippets/${folder}/`;
  const files = {};
  for (const [path, content] of Object.entries(rawSnippets)) {
    if (!path.startsWith(prefix)) continue;
    const rel = "/" + path.slice(prefix.length);
    files[rel] = content;
  }
  return files;
}

export function readOverlay(folder) {
  try {
    const raw = localStorage.getItem(snippetStorageKey(folder));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function snippetConfigKey(folder) {
  return `sandpack-snippet-config:v1:${folder}`;
}

export function readSnippetConfig(folder) {
  try {
    const raw = localStorage.getItem(snippetConfigKey(folder));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
