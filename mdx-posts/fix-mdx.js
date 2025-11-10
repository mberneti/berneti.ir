import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { remark } from "remark";
import html from "remark-html";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "./"); // Change this to your folder path

// Function to fix nested <p> tags
function fixNestedPTags(content) {
  return content.replace(/<p>(.*?)<\/p>/gs, (match, innerContent) => {
    // Replace nested <p> tags within the inner content
    const fixedInnerContent = innerContent.replace(/<p>(.*?)<\/p>/gs, "$1");
    return `<p>${fixedInnerContent}</p>`;
  });
}

// Process each MDX file in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (path.extname(file) === ".mdx") {
      fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        const fixedContent = fixNestedPTags(content);

        fs.writeFile(filePath, fixedContent, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log(`Processed and fixed nested <p> tags in ${file}`);
          }
        });
      });
    }
  });
});
