import fs from "fs";

const dir = "./evo";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

async function downloadevo() {
  console.log("📦 Baixando linhas evolutivas 7 → 30...");

  // 🔁 Loop de 7 até 30
  for (let i = 1; i <= 6; i++) {
    try {
      console.log(`\n🔍 Buscando cadeia #${i}...`);

      const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}/`, {
        headers: { "User-Agent": "MatheusHaliskiApp/1.0" },
      });

      if (!res.ok) {
        console.warn(`⚠️ Falha ao buscar cadeia ${i}: status ${res.status}`);
        continue;
      }

      const data = await res.json();

      // Extrai todos os nomes da cadeia
      const evoNames = [];
      let current = data.chain;
      do {
        evoNames.push(current.species.name);
        current = current.evolves_to[0];
      } while (current && current.hasOwnProperty("evolves_to"));

      console.log("🔗 Cadeia:", evoNames.join(" → "));

      // Cria subpasta para esta cadeia
      const subDir = `${dir}/chain_${i}`;
      if (!fs.existsSync(subDir)) fs.mkdirSync(subDir);

      // Baixa imagens
      for (const name of evoNames) {
        const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const detail = await detailRes.json();
        const imageUrl = detail.sprites.other["official-artwork"].front_default;

        if (imageUrl) {
          const img = await fetch(imageUrl).then(r => r.arrayBuffer());
          // eslint-disable-next-line no-undef
          fs.writeFileSync(`${subDir}/${name}.png`, Buffer.from(img));
          console.log(`✅ ${name} baixado`);
        } else {
          console.warn(`⚠️ ${name} sem imagem`);
        }
      }
    } catch (err) {
      console.error(`❌ Erro na cadeia ${i}:`, err.message);
    }
  }

  console.log("\n🎉 Todas as cadeias evolutivas foram baixadas!");
}

