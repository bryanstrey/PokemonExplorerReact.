import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesScreen() {
  const { favoritesselected } = useFavorites();
  const navigation = useNavigation<any>();
  const screenWidth = Dimensions.get("window").width;

  const cardWidth = (screenWidth - 48) / 2;

  // 🔹 Separa por origem
  const cardFavorites = favoritesselected.filter(
      (item) => item.origin === "card"
  );
  const pokeFavorites = favoritesselected.filter(
      (item) => item.origin === "poke"
  );

  // 🔹 Mescla os arrays para renderizar lado a lado
  const maxLength = Math.max(cardFavorites.length, pokeFavorites.length);
  const mergedFavorites = Array.from({ length: maxLength }).map((_, i) => ({
    left: cardFavorites[i],
    right: pokeFavorites[i],
    id: i.toString(),
  }));

  if (favoritesselected.length === 0) {
    return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>⭐ Nenhum favorito ainda</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        {/* 🔹 Cabeçalho geral */}
        <Text style={styles.header}>⭐ Favoritos</Text>

        {/* 🔹 Cabeçalhos das colunas */}
        <View style={styles.columnsHeader}>
          <Text style={styles.columnTitle}>Cards Pokémon</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.columnTitle}>Pokédex</Text>
        </View>

        {/* 🔹 Lista */}
        <FlatList
            data={mergedFavorites}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
                <View style={styles.row}>
                  {/* --------- COLUNA 1 (Cards) --------- */}
                  <View
                      style={[
                        styles.cardWrapper,
                        { width: cardWidth, borderRightWidth: 1, borderColor: "#444" },
                      ]}
                  >
                    {item.left ? (
                        <TouchableOpacity
                            style={styles.cardContainer}
                            onPress={() =>
                                navigation.navigate("DetailsScreen", { pokemon: item.left })
                            }
                        >
                          <Image
                              source={
                                typeof item.left.imageUrl === "string"
                                    ? { uri: item.left.imageUrl }
                                    : item.left.imageUrl
                              }
                              style={styles.image}
                          />
                          <Text style={styles.name}>{item.left.name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.placeholder, { width: cardWidth }]} />
                    )}
                  </View>

                  {/* --------- COLUNA 2 (Pokémons) --------- */}
                  <View style={[styles.cardWrapper, { width: cardWidth }]}>
                    {item.right ? (
                        <TouchableOpacity
                            style={styles.cardContainer}
                            onPress={() =>
                                navigation.navigate("DetailsScreen", { pokemon: item.right })
                            }
                        >
                          <Image
                              source={
                                typeof item.right.imageUrl === "string"
                                    ? { uri: item.right.imageUrl }
                                    : item.right.imageUrl
                              }
                              style={styles.image}
                          />
                          <Text style={styles.name}>{item.right.name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.placeholder, { width: cardWidth }]} />
                    )}
                  </View>
                </View>
            )}
        />
      </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#ffcc00",
  },

  // 🔹 Cabeçalhos das colunas
  columnsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#eee",
    textAlign: "center",
    flex: 1,
  },
  verticalLine: {
    width: 1,
    height: 20,
    backgroundColor: "#555",
    marginHorizontal: 6,
  },

  // 🔹 Cards
  listContainer: { paddingBottom: 50 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: "#333",
    paddingTop: 12,
  },
  cardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: "#2c2c2c",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  image: { width: 120, height: 120, borderRadius: 8, marginBottom: 8 },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
  },
  placeholder: { backgroundColor: "transparent" },

  // 🔹 Mensagem de vazio
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1b",
  },
  emptyText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
  },
});
