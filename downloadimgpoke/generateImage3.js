// scripts/generateImageMap.js
import fs from "fs";

const files = fs.readdirSync("/Users/matheushaliski/downloadimgpoke/evo");
const map = files
  .filter((f) => f.endsWith(".png"))
  .map(
    (f) =>
      `  "${f.replace(".png", "")}": require("@/assets/evo/${f}"),`
  )
  .join("\n");

fs.writeFileSync(
  ".pokemonImages3.ts",
  `export const pokemonImages = {\n${map}\n};\n`
);
