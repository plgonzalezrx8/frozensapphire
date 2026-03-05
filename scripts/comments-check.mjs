/**
 * Enforces comment requirements for service/controller modules.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const TARGET_DIRECTORIES = [
  "src/modules/content",
  "src/modules/rbac",
  "src/lib/auth",
  "src/app/api/v1/content",
  "src/app/api/v1/content-types",
];

const FILE_EXTENSIONS = new Set([".ts", ".tsx"]);

function walk(directory) {
  const entries = readdirSync(directory);
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      files.push(...walk(absolutePath));
      continue;
    }

    if (!FILE_EXTENSIONS.has(absolutePath.slice(absolutePath.lastIndexOf(".")))) {
      continue;
    }

    if (
      absolutePath.endsWith(".test.ts") ||
      absolutePath.endsWith(".test.tsx") ||
      absolutePath.endsWith(".int.test.ts") ||
      absolutePath.endsWith(".d.ts")
    ) {
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

function hasModuleHeaderComment(source) {
  const firstCodeLine = source
    .split("\n")
    .find((line) => line.trim().length > 0);

  return typeof firstCodeLine === "string" && firstCodeLine.trim().startsWith("/**");
}

function hasJsDocBefore(lines, lineIndex) {
  for (let index = lineIndex - 1; index >= 0 && index >= lineIndex - 8; index -= 1) {
    const line = lines[index].trim();

    if (!line) {
      continue;
    }

    if (line.endsWith("*/")) {
      for (let docIndex = index; docIndex >= 0 && docIndex >= index - 8; docIndex -= 1) {
        if (lines[docIndex].trim().startsWith("/**")) {
          return true;
        }
      }
    }

    if (!line.startsWith("*") && !line.startsWith("//")) {
      return false;
    }
  }

  return false;
}

const failures = [];

for (const targetDirectory of TARGET_DIRECTORIES) {
  for (const file of walk(targetDirectory)) {
    const source = readFileSync(file, "utf8");
    const lines = source.split("\n");

    if (!hasModuleHeaderComment(source)) {
      failures.push(`${file}: missing module header comment`);
    }

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const isExportedFunction =
        /^export\s+(async\s+)?function\s+/.test(line.trim()) ||
        /^export\s+default\s+function\s+/.test(line.trim());

      if (!isExportedFunction) {
        continue;
      }

      if (!hasJsDocBefore(lines, index)) {
        failures.push(`${file}:${index + 1} missing JSDoc for exported function`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Comment policy check failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Comment policy check passed.");
