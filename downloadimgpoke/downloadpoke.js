import fs from "fs";

const dir = "./poke";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

async function downloadpoke() {
  console.log("📦 Baixando lista de Pokémon...");

  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
    headers: { "User-Agent": "MatheusHaliskiApp/1.0" },
  });

  console.log("📡 Status da resposta:", res.status);

  const data = await res.json();
  const cards = data.results;

  if (!cards || !Array.isArray(cards)) {
    console.error("❌ Erro: cards não é uma lista:", cards);
    return;
  }

  for (const card of cards) {
    const detail = await fetch(card.url).then(r => r.json());
    const imageUrl = detail.sprites?.other?.["official-artwork"]?.front_default;
    const name = card.name;

    if (imageUrl) {
      const img = await fetch(imageUrl).then(r => r.arrayBuffer());
      // eslint-disable-next-line no-undef
      fs.writeFileSync(`${dir}/${name}.png`, Buffer.from(img));
      console.log(`✅ ${name} baixado`);
    }
  }

  console.log("🎉 Todos os Pokémon foram baixados!");
}

downloadpoke();
