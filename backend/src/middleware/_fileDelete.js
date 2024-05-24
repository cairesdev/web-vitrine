const fs = require("fs").promises;
const path = require("path");

async function FileDelete() {
  const dirPath = "./lib/produtos/originals";

  try {
    const files = await fs.readdir(dirPath);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    for (const file of files) {
      try {
        await fs.unlink(path.join(dirPath, file));
      } catch (err) {
        console.error(`Arquivo ainda aberto: ${file}`);
        try {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          await fs.unlink(path.join(dirPath, file));
        } catch (error) {
          console.error(`Arquivo ainda aberto ${file}:`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err);
  }

  return true;
}

module.exports = FileDelete;
