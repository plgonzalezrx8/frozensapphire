#!/usr/bin/env node
/**
 * Validates that required environment variables exist before CI work begins.
 * Fails fast with a concise error list to reduce noisy downstream failures.
 */

/**
 * Parses required variable names from command arguments.
 * @param {string[]} argv - Raw process arguments.
 * @returns {string[]} Required environment variable names.
 */
function parseRequiredVars(argv) {
  const requiredFlagIndex = argv.indexOf("--required");

  if (requiredFlagIndex === -1) {
    return [];
  }

  return argv.slice(requiredFlagIndex + 1).filter((entry) => entry && !entry.startsWith("--"));
}

/**
 * Returns missing variables from the provided list.
 * @param {string[]} requiredVars - Variables that must be non-empty.
 * @returns {string[]} Missing variable names.
 */
function getMissingVars(requiredVars) {
  return requiredVars.filter((name) => {
    const value = process.env[name];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

const requiredVars = parseRequiredVars(process.argv.slice(2));

if (requiredVars.length === 0) {
  console.error("No required environment variables were provided. Use --required <VAR>...");
  process.exit(1);
}

const missingVars = getMissingVars(requiredVars);

if (missingVars.length > 0) {
  console.error("Missing required environment variables:");
  for (const name of missingVars) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log(`Validated ${requiredVars.length} required environment variables.`);
