import React, { useMemo, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated, {
  FadeInRight,
  Layout,
} from "react-native-reanimated";
import { pokemonImages3 } from "@/downloadimgpoke/pokemonImages3";

const AnimatedCard = Animated.createAnimatedComponent(View);

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export default function DetailsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Agrupa as cadeias evolutivas
  const evoChains = useMemo(() => {
    const groups: Record<string, { name: string; image: any }[]> = {};
    Object.entries(pokemonImages3).forEach(([key, image]) => {
      const [chain, name] = key.split("/");
      if (!groups[chain]) groups[chain] = [];
      groups[chain].push({ name, image });
    });
    Object.values(groups).forEach(list =>
        list.sort((a, b) => a.name.localeCompare(b.name))
    );
    return Object.entries(groups).map(([id, evolutions]) => ({ id, evolutions }));
  }, []);

  // Função para buscar detalhes de um Pokémon pelo nome
  const fetchDetails = async (name: string) => {
    try {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`); // endpoint da PokéAPI :contentReference[oaicite:1]{index=1}
      if (!resp.ok) throw new Error("Erro ao buscar detalhes");
      const json = await resp.json();
      const data: PokemonDetails = {
        id: json.id,
        name: json.name,
        height: json.height,
        weight: json.weight,
        types: json.types,
        abilities: json.abilities,
      };
      setDetails(data);
    } catch (e) {
      console.warn("Fetch details error:", e);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Quando “selected” mudar, busca os detalhes
  useEffect(() => {
    if (selected) {
      fetchDetails(selected);
    }
  }, [selected]);

  return (
      <View style={styles.container}>
        <Animated.Text
            entering={FadeInRight.duration(800)}
            style={styles.title}
        >
          🌟 Linhas Evolutivas
        </Animated.Text>

        <FlatList
            data={evoChains}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
                <AnimatedCard
                    key={item.id}
                    entering={FadeInRight.delay(index * 120).duration(700)}
                    layout={Layout.springify()}
                    style={[styles.card, { width: screenWidth * 0.92 }]}
                >
                  <Text style={styles.chainLabel}>
                    {item.id.replace("chain_", "Cadeia ")}
                  </Text>

                  {/* Centralizando o conteúdo horizontal */}
                  <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={[
                        styles.scrollRow,
                        { justifyContent: "center", width: screenWidth * 0.92 }
                      ]}
                  >
                    {item.evolutions.map((evo, i) => (
                        <Animated.View
                            key={evo.name}
                            entering={FadeInRight.delay(i * 180).duration(700)}
                            style={styles.evoContainer}
                        >
                          <View style={styles.pokeItem}>
                            <Image source={evo.image} style={styles.image} />
                            <Text style={styles.name}>{evo.name}</Text>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.modernButton}
                                onPress={() => {
                                  setSelected(evo.name);
                                }}
                            >
                              <Text style={styles.btnText}>Detalhes</Text>
                            </TouchableOpacity>
                          </View>

                          {i < item.evolutions.length - 1 && (
                              <Text style={styles.arrow}>➜</Text>
                          )}
                        </Animated.View>
                    ))}
                  </ScrollView>
                </AnimatedCard>
            )}
        />

        {/* Modal simples / área de detalhes */}
        {selected && (
            <View style={styles.detailsContainer}>
              {loading ? (
                  <ActivityIndicator size="large" color="#ffd93b" />
              ) : details ? (
                  <View style={styles.detailsBox}>
                    <Text style={styles.detailTitle}>{details.name.toUpperCase()}</Text>
                    <Text>ID: {details.id}</Text>
                    <Text>Altura: {details.height}</Text>
                    <Text>Peso: {details.weight}</Text>
                    <Text>
                      Tipos: {details.types.map(t => t.type.name).join(", ")}
                    </Text>
                    <Text>
                      Habilidades: {details.abilities.map(a => a.ability.name).join(", ")}
                    </Text>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelected(null)}
                    >
                      <Text style={styles.closeBtnText}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
              ) : (
                  <Text style={{ color: "#fff" }}>Não foi possível carregar os detalhes.</Text>
              )}
            </View>
        )}

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0c",
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffd93b",
    textAlign: "center",
    marginBottom: 25,
    textShadowColor: "rgba(255,255,255,0.2)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  listContainer: {
    alignItems: "center",
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 25,
    marginVertical: 14,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: "#ffd93b",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.1)",
  },
  chainLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: "#aaa",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  scrollRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  evoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pokeItem: {
    alignItems: "center",
    backgroundColor: "#2b2b2b",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    shadowColor: "#ffd93b",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 16,
    marginBottom: 10,
  },
  arrow: {
    fontSize: 34,
    marginHorizontal: 14,
    color: "#ffd93b",
    textShadowColor: "rgba(255, 255, 100, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    textTransform: "capitalize",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  modernButton: {
    backgroundColor: "#ffd93b",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 4,
    shadowColor: "#fff58c",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
  detailsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  detailsBox: {
    backgroundColor: "#aaa",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#10100f",
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#ffd93b",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
});
