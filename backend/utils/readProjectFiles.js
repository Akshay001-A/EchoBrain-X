const fs = require("fs");
const path = require("path");

const allowedExtensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".java",
  ".py",
  ".json",
  ".md",
];

const ignoredFolders = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
];

const readProjectFiles = (directoryPath) => {
  let files = [];

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const fullPath = path.join(directoryPath, item);

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (ignoredFolders.includes(item)) {
        continue;
      }

      files = files.concat(
        readProjectFiles(fullPath)
      );
    } else {
      const extension = path.extname(fullPath);

      if (
        allowedExtensions.includes(extension)
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
};

module.exports = readProjectFiles;