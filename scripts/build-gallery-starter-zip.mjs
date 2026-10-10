import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const downloadsDir = resolve(here, "..", "public", "downloads");
const zipPath = resolve(downloadsDir, "gallery-starter.zip");

rmSync(zipPath, { force: true });

execFileSync("zip", ["-r", "-X", "gallery-starter.zip", "gallery_starter"], {
  cwd: downloadsDir,
  stdio: "inherit",
});

console.log(`Wrote ${zipPath}`);
