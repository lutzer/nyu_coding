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

export function safeReadJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function safeWriteJSON(key, value) {
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

export function computeOverlay(sandpackFiles, pristineFiles) {
  const overlay = {};
  for (const [p, file] of Object.entries(sandpackFiles)) {
    const pristine = pristineFiles[p];
    if (pristine === undefined) continue;
    if (file.code !== pristine) overlay[p] = file.code;
  }
  return overlay;
}

export function mergeOverlay(pristineFiles, overlay) {
  const out = {};
  for (const [p, code] of Object.entries(pristineFiles)) {
    out[p] = Object.prototype.hasOwnProperty.call(overlay, p) ? overlay[p] : code;
  }
  return out;
}

export function loadOverlay(folder) {
  return safeReadJSON(snippetStorageKey(folder)) ?? {};
}

export function saveOverlay(folder, overlay) {
  safeWriteJSON(snippetStorageKey(folder), overlay);
}

export function clearOverlay(folder) {
  safeWriteJSON(snippetStorageKey(folder), null);
}

export const previewWindowKey = "sandpack-preview-window:v1";

export function loadPreviewWindowRect() {
  return safeReadJSON(previewWindowKey);
}

export function savePreviewWindowRect(rect) {
  safeWriteJSON(previewWindowKey, rect);
}
