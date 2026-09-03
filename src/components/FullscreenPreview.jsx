import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  SandpackProvider,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import {
  loadSnippetFiles,
  readSnippetConfig,
  snippetStorageKey,
  loadOverlay,
  mergeOverlay,
  savePreviewWindowRect,
} from "./snippetFiles";

function usePersistWindowRect() {
  useEffect(() => {
    function snapshot() {
      savePreviewWindowRect({
        left: window.screenX,
        top: window.screenY,
        width: window.outerWidth,
        height: window.outerHeight,
      });
    }
    const interval = setInterval(snapshot, 1000);
    window.addEventListener("resize", snapshot);
    window.addEventListener("pagehide", snapshot);
    window.addEventListener("beforeunload", snapshot);
    return () => {
      snapshot();
      clearInterval(interval);
      window.removeEventListener("resize", snapshot);
      window.removeEventListener("pagehide", snapshot);
      window.removeEventListener("beforeunload", snapshot);
    };
  }, []);
}

function LiveSync({ folder, pristineFiles }) {
  const { sandpack } = useSandpack();

  useEffect(() => {
    function onStorage(e) {
      if (e.key !== snippetStorageKey(folder)) return;
      const merged = mergeOverlay(pristineFiles, loadOverlay(folder));
      for (const [p, code] of Object.entries(merged)) {
        sandpack.updateFile(p, code);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [folder, pristineFiles, sandpack]);

  return null;
}

export default function FullscreenPreview() {
  const params = useParams();
  const folder = params["*"] || "";
  usePersistWindowRect();

  const pristine = useMemo(() => loadSnippetFiles(folder), [folder]);
  const files = useMemo(
    () => mergeOverlay(pristine, loadOverlay(folder)),
    [folder, pristine],
  );
  const { template = "react", customSetup } = readSnippetConfig(folder);

  if (Object.keys(pristine).length === 0) {
    return (
      <div style={{ padding: 24, color: "#900" }}>
        No snippet files found for <code>{folder}</code>.
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <SandpackProvider
        template={template}
        customSetup={customSetup}
        files={files}
      >
        <SandpackPreview style={{ height: "100vh", width: "100vw" }} />
        <LiveSync folder={folder} pristineFiles={pristine} />
      </SandpackProvider>
    </div>
  );
}
