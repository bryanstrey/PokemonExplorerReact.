export interface Pokemon {
  id: any;
  name: string;
  imageUrl: any;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: Record<string, number>;
  origin?: "card" | "poke";
}

export function parsePokemon(json: any): Pokemon {
  const id = json.id;
  const name = json.name;
  const imageUrl = json.sprites?.front_default ?? "";

  const types = (json.types ?? []).map((t: any) => t.type.name);

  const height = json.height;
  const weight = json.weight;

  const abilities = (json.abilities ?? []).map((a: any) => a.ability.name);

  const stats: Record<string, number> = {};
  (json.stats ?? []).forEach((s: any) => {
    stats[s.stat.name] = s.base_stat;
  });

  return {
    id,
    name,
    imageUrl,
    types,
    height,
    weight,
    abilities,
    stats,
  };
}

export function parsePokemon2(data: any): Pokemon {
  return {
    id: data.id,
    name: data.name,
    imageUrl:
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => a.ability.name),
    stats: Object.fromEntries(
      data.stats.map((s: any) => [s.stat.name, s.base_stat])
    ),
  };
}

