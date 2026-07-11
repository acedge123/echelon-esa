#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import YAML from "yaml";

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(process.cwd(), process.argv[2] || "esa.yaml");
const schemaPath = path.resolve(here, "../schemas/esa.schema.json");

try {
  const manifest = YAML.parse(fs.readFileSync(manifestPath, "utf8"));
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  if (validate(manifest)) {
    console.log(`✓ Valid ESA manifest: ${manifestPath}`);
    process.exit(0);
  }

  console.error(`✗ Invalid ESA manifest: ${manifestPath}`);
  for (const error of validate.errors || []) {
    console.error(`  ${error.instancePath || "/"} ${error.message}`);
  }
  process.exit(1);
} catch (error) {
  console.error(`✗ Could not validate ${manifestPath}`);
  console.error(`  ${error.message}`);
  process.exit(1);
}