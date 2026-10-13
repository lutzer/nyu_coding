import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const downloadsDir = resolve(here, "..", "public", "downloads");
const zipPath = resolve(downloadsDir, "html-boilerplate.zip");

rmSync(zipPath, { force: true });

execFileSync("zip", ["-r", "-X", "html-boilerplate.zip", "html_boilerplate"], {
  cwd: downloadsDir,
  stdio: "inherit",
});

console.log(`Wrote ${zipPath}`);
