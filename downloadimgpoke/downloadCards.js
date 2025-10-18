import fs from "fs";
import axios from "axios";

const downloadCards = async () => {
  console.log("📦 Baixando cartas do Pokémon TCG...");
  const { data } = await axios.get("https://api.pokemontcg.io/v2/cards?pageSize=20");
  const cards = data.data;

  if (!fs.existsSync("cards")) fs.mkdirSync("cards");

  for (const card of cards) {
    const imageUrl = card.images.large;
    const filePath = `cards/${card.id}.jpg`;

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);
    console.log(`✅ ${card.name} salvo!`);
  }

  console.log("🎉 Download concluído!");
};

downloadCards();
