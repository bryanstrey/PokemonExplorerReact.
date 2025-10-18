import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useFavorites } from "./FavoritesContext";
import { Pokemon } from "./Pokemon";

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20); // quantos pokemons carregar por vez
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  // 🔹 Buscar Pokémons
  const fetchPokemons = async (offsetParam = 0) => {
    try {
      offsetParam === 0 ? setLoading(true) : setLoadingMore(true);

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetParam}&limit=${limit}`);
      const data = await res.json();

      setTotalCount(data.count);

      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const details = await fetch(p.url).then(r => r.json());
          return {
            id: details.id,
            name: details.name,
            imageUrl: details.sprites.other["official-artwork"].front_default,
            types: details.types.map((t: any) => t.type.name),
            height: details.height / 10,
            weight: details.weight / 10,
            abilities: details.abilities.map((a: any) => a.ability.name),
            stats: details.stats.reduce(
              (acc: Record<string, number>, s: any) => ({ ...acc, [s.stat.name]: s.base_stat }),
              {}
            ),
            origin: "poke",
          } as Pokemon;
        })
      );

      setPokemons(prev => [...prev, ...detailed]);
      filterPokemons(search, selectedType, [...pokemons, ...detailed]);
      setOffset(prev => prev + limit);

    } catch (error) {
      console.error("❌ Erro ao buscar pokémons:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const types = [
    "fire","water","grass","electric","bug","poison",
    "ground","flying","psychic","fighting","rock",
    "ghost","ice","dragon","dark","steel","fairy",
  ];

  const filterPokemons = (text: string, type: string | null, sourceArray = pokemons) => {
    let filtered = sourceArray;
    if (type) filtered = filtered.filter(p => p.types.includes(type));
    if (text.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredPokemons(filtered);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    filterPokemons(text, selectedType);
  };

  const filterByType = (type: string | null) => {
    setSelectedType(type);
    filterPokemons(search, type);
  };

  const loadMore = () => {
    if (!loadingMore && pokemons.length < totalCount) {
      fetchPokemons(offset);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={{ color: "#fff", marginTop: 8 }}>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex API + Filtros</Text>

      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 50 }}
        stickyHeaderIndices={[0]} // fixa o header (pesquisa + filtros)
        ListHeaderComponent={
          <View style={{ backgroundColor: "#1b1b1b" }}>
            {/* Barra de pesquisa */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Pokémon"
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={handleSearch}
            />

            {/* Filtros por tipo */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            >
              <TouchableOpacity
                style={[styles.filterButton, !selectedType && styles.filterButtonActive]}
                onPress={() => filterByType(null)}
              >
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>

              {types.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterButton, selectedType === type && styles.filterButtonActive]}
                  onPress={() => filterByType(type)}
                >
                  <Text style={styles.filterText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.starButton} onPress={() => toggleFavorite(item)}>
              <Text style={styles.star}>{isFavorite(item) ? "⭐" : "☆"}</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="contain" transition={1000} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.types.join(", ").toUpperCase()}</Text>
            <Text style={styles.detail}>Altura: {item.height} m</Text>
            <Text style={styles.detail}>Peso: {item.weight} kg</Text>
          </View>
        )}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color="#ffcc00" style={{ marginVertical: 20 }} />
          ) : pokemons.length < totalCount ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
              <Text style={styles.loadMoreText}>Carregar mais</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#1b1b1b" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#ffcc00", marginBottom: 8 },
  searchInput: { backgroundColor: "#fff", borderRadius: 25, padding: 10, marginBottom: 8, width: 200 },
  filterContainer: { flexDirection: "row", paddingHorizontal: 4, marginBottom: 8 },
  filterButton: { backgroundColor: "#333", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  filterButtonActive: { backgroundColor: "#ffcc00" },
  filterText: { color: "#fff", fontWeight: "600", textTransform: "capitalize" },
  row: { justifyContent: "space-between", marginBottom: 16 },
  card: { flex: 1, backgroundColor: "#2c2c2c", marginHorizontal: 6, borderRadius: 12, paddingVertical: 12, alignItems: "center", position: "relative" },
  starButton: { position: "absolute", top: 6, right: 8 },
  star: { fontSize: 24, color: "#ffcc00" },
  image: { width: 100, height: 100 },
  name: { fontSize: 16, fontWeight: "700", color: "#fff", textTransform: "capitalize" },
  type: { fontSize: 13, color: "#ccc", marginBottom: 6 },
  detail: { fontSize: 12, color: "#aaa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadMoreButton: { padding: 12, marginVertical: 16, backgroundColor: "#ffcc00", borderRadius: 25, alignSelf: "center" },
  loadMoreText: { color: "#000", fontWeight: "700" },
});
