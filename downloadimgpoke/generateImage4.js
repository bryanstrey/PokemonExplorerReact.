import fs from "fs";
import path from "path";

// 🔹 Caminho base da pasta evo
const baseDir = "/Users/matheushaliski/downloadimgpoke/evo";

// 🔹 Função recursiva para listar todos os .png
function getAllPngFiles(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // 🔁 Se for pasta, entra recursivamente
      results.push(...getAllPngFiles(filePath));
    } else if (file.endsWith(".png")) {
      results.push(filePath);
    }
  });
  return results;
}

// 🔹 Busca todas as imagens dentro das subpastas
const files = getAllPngFiles(baseDir);

// 🔹 Gera o mapeamento
const map = files
  .map((filePath) => {
    // Exemplo: /Users/.../evo/chain_1/bulbasaur.png
    const relPath = path.relative(baseDir, filePath).replace(/\\/g, "/");
    const key = relPath.replace(".png", ""); // chain_1/bulbasaur
    return `  "${key}": require("@/assets/evo/${relPath}"),`;
  })
  .join("\n");

// 🔹 Gera o conteúdo final do arquivo TypeScript
const output = `// ⚙️ Gerado automaticamente — não editar manualmente
export const pokemonImages3 = {
${map}
};
`;

// 🔹 Grava o resultado no projeto
fs.writeFileSync("./pokemonImages3.ts", output);

console.log(`✅ Mapeamento gerado com sucesso! Total: ${files.length} imagens`);
