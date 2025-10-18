// scripts/generateImageMap.js
import fs from "fs";

const files = fs.readdirSync("/Users/matheushaliski/downloadimgpoke/poke");
const map = files
  .filter((f) => f.endsWith(".png"))
  .map(
    (f) =>
      `  "${f.replace(".png", "")}": require("@/assets/poke/${f}"),`
  )
  .join("\n");

fs.writeFileSync(
  ".pokemonImages2.ts",
  `export const pokemonImages = {\n${map}\n};\n`
);
