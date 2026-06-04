const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const extractZip = (zipFilePath) => {
  try {
    const extractionFolder = path.join(
      "uploads",
      "extracted",
      uuidv4()
    );

    fs.mkdirSync(extractionFolder, {
      recursive: true,
    });

    const zip = new AdmZip(zipFilePath);

    zip.extractAllTo(extractionFolder, true);

    return extractionFolder;
  } catch (error) {
    console.error("ZIP Extraction Error:", error);

    throw error;
  }
};

module.exports = extractZip;