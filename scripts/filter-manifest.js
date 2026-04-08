#!/usr/bin/env node

/**
 * Keeps only stories listed in chromatic.include.json in the generated
 * storybook-static/manifest.json. Run automatically after generate-manifest.
 * If includedStoryIds is empty, the manifest is left unchanged.
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const manifestPath = path.join(root, "storybook-static", "manifest.json");
const includePath = path.join(root, "chromatic.include.json");

if (!fs.existsSync(manifestPath)) {
  console.error(`filter-manifest: manifest not found at ${manifestPath}`);
  process.exit(1);
}

if (!fs.existsSync(includePath)) {
  console.error(`filter-manifest: include list not found at ${includePath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const { includedStoryIds } = JSON.parse(fs.readFileSync(includePath, "utf8"));

if (!includedStoryIds || includedStoryIds.length === 0) {
  console.log("filter-manifest: no inclusions configured, manifest unchanged.");
  process.exit(0);
}

const includeSet = new Set(includedStoryIds);
const before = manifest.stories.length;
manifest.stories = manifest.stories.filter((story) =>
  includeSet.has(story.storyId)
);
const kept = manifest.stories.length;
const removed = before - kept;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(
  `filter-manifest: kept ${kept} story(s), removed ${removed} from manifest.`
);
