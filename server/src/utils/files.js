import fs from "fs";
import path from "path";

export function ensureUploadDir(relativeDir) {
  const fullPath = path.resolve(process.cwd(), "..", relativeDir);
  fs.mkdirSync(fullPath, { recursive: true });
}

