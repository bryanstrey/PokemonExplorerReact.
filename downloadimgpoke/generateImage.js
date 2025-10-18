// scripts/generateImageMap.js
import fs from "fs";

const files = fs.readdirSync("./cards");
const map = files
  .filter((f) => f.endsWith(".jpg"))
  .map(
    (f) =>
      `  "${f.replace(".jpg", "")}": require("../cards/${f}"),`
  )
  .join("\n");

fs.writeFileSync(
  ".pokemonImages.ts",
  `export const pokemonImages = {\n${map}\n};\n`
);
