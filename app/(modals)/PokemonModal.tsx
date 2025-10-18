import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { Pokemon } from "../(tabs)/Pokemon";
import { useFavorites } from "../(tabs)/FavoritesContext";

type PokemonModalProps = {
    visible: boolean;
    pokemon: Pokemon | null;
    onClose: () => void;
};

export default function PokemonModal({ visible, pokemon, onClose }: PokemonModalProps) {
    const { toggleFavorite, isFavorite } = useFavorites();

    if (!pokemon) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

                    <Image
                        source={
                            typeof pokemon.imageUrl === "string"
                                ? { uri: pokemon.imageUrl }
                                : pokemon.imageUrl
                        }
                        style={styles.image}
                    />

                    <Text style={styles.info}>Tipo: {pokemon.types.join(", ")}</Text>
                    <Text style={styles.info}>Altura: {pokemon.height} m</Text>
                    <Text style={styles.info}>Peso: {pokemon.weight} kg</Text>

                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(pokemon)}
                    >
                        <Text style={styles.favoriteText}>
                            {isFavorite(pokemon) ? "★ Remover dos Favoritos" : "☆ Adicionar aos Favoritos"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    image: {
        width: 160,
        height: 160,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#ffcc00",
        backgroundColor: "#f2f2f2",
        marginBottom: 10,
    },
    info: { fontSize: 16, color: "#333", marginVertical: 3 },
    favoriteButton: {
        backgroundColor: "#ffeb99",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    favoriteText: { fontSize: 16, color: "#333", fontWeight: "600" },
    closeButton: {
        marginTop: 16,
        backgroundColor: "#ff3366",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    closeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
