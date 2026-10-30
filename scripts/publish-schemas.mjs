// Copies the machine-readable specification into public/ so every version has a
// stable URL: /spec/<version>/schemas/... and /spec/<version>/examples/...
import fs from "node:fs";
import path from "node:path";

const SPEC_DIR = path.resolve(process.env.SPEC_DIR ?? "spec");
const { version } = JSON.parse(fs.readFileSync(path.join(SPEC_DIR, "spec.json"), "utf8"));
const target = path.resolve("public", "spec", version);

fs.rmSync(target, { recursive: true, force: true });
for (const dir of ["schemas", "examples"]) {
  fs.cpSync(path.join(SPEC_DIR, dir), path.join(target, dir), { recursive: true });
}
fs.copyFileSync(path.join(SPEC_DIR, "spec.json"), path.join(target, "spec.json"));
console.log(`Published specification ${version} to ${path.relative(process.cwd(), target)}`);
