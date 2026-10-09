// Packs the project source (no node_modules/.next/out/.git) into hostinger-upload.zip,
// inside a top-level folder named like the project, for Hostinger's "upload archive" deploy.
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const root = resolve(".");
const folder = basename(root);
const target = join(root, "hostinger-upload.zip");
rmSync(target, { force: true });
execFileSync(
  "zip",
  ["-rq", target, folder, "-x", ...["node_modules", ".next", "out", ".git"].map((d) => `${folder}/${d}/*`), `${folder}/hostinger-upload.zip`, "*.DS_Store"],
  { cwd: dirname(root), stdio: "inherit" },
);
console.log(`✓ Created hostinger-upload.zip (folder "${folder}")`);
