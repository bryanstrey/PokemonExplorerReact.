import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { useFavorites } from "./FavoritesContext";
import { Pokemon } from "./Pokemon";
import CardModal from "../(modals)/cardModal";

export const pokemonImages1: Record<string, any> = {
    "absol(2)": require("@/assets/cards/absol(2).jpg"),
    "absol": require("@/assets/cards/absol.jpg"),
    "aerodactyl(2)": require("@/assets/cards/aerodactyl(2).jpg"),
    "aerodactyl": require("@/assets/cards/aerodactyl.jpg"),
    "aggron": require("@/assets/cards/aggron.jpg"),
    "alakazam": require("@/assets/cards/alakazam.jpg"),
    "ampharos(2)": require("@/assets/cards/ampharos(2).jpg"),
    "ampharos(3)": require("@/assets/cards/ampharos(3).jpg"),
    "ampharos": require("@/assets/cards/ampharos.jpg"),
    "arcanine": require("@/assets/cards/arcanine.jpg"),
    "azumarill": require("@/assets/cards/azumarill.jpg"),
    "beedrill": require("@/assets/cards/beedrill.jpg"),
    "blainesmoltres": require("@/assets/cards/blainesmoltres.jpg"),
    "bulbasaur": require("@/assets/cards/bulbasaur.jpg"),
    "caterpie(2)": require("@/assets/cards/caterpie(2).jpg"),
    "caterpie": require("@/assets/cards/caterpie.jpg"),
    "celebivenusaur": require("@/assets/cards/celebivenusaur.jpg"),
    "dratini": require("@/assets/cards/dratini.jpg"),
    "venusaur": require("@/assets/cards/venusaur.jpg"),
    "weedle": require("@/assets/cards/weedle.jpg"),
};

export default function Card() {
    const [loading] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();
    const navigation = useNavigation<any>();

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const screenWidth = Dimensions.get("window").width;
    const cardWidth = screenWidth * 0.9; // 90% da tela

    const data20: Pokemon[] = Object.entries(pokemonImages1).map(
        ([name, image], index) => ({
            id: `card-${name}`,
            name,
            imageUrl: image,
            types: ["card"],
            height: 0,
            weight: 0,
            abilities: [],
            stats: {},
            origin: "card",
        })
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ffcc00" />
                <Text style={{ color: "#fff", marginTop: 8 }}>Carregando Cartas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⭐ PokéCards Collection</Text>

            <FlatList
                data={data20}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { width: cardWidth }]}
                        activeOpacity={0.9}
                        onPress={() => {
                            setSelectedPokemon(item);
                            setModalVisible(true);
                        }}
                    >
                        <Image
                            source={item.imageUrl || require("../../assets/images/icon.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => toggleFavorite(item)}
                                style={styles.favoriteButton}
                            >
                                <Text style={styles.favorite}>
                                    {isFavorite(item) ? "⭐" : "☆"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 🔹 Modal */}
            <CardModal
                visible={modalVisible}
                pokemon={selectedPokemon}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1b1b",
        alignItems: "center",
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#ffcc00",
        marginBottom: 20,
    },
    listContainer: {
        alignItems: "center",
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#2c2c2c",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    image: {
        width: "90%",
        height: 280,
        borderRadius: 12,
        marginBottom: 10,
    },
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        textTransform: "capitalize",
        textAlign: "center",
        marginBottom: 8,
    },
    favoriteButton: {
        alignSelf: "center",
        backgroundColor: "#3a3a3a",
        borderRadius: 50,
        padding: 8,
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    favorite: {
        fontSize: 26,
        color: "#ffcc00",
    },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
