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

type CardModalProps = {
    visible: boolean;
    pokemon: Pokemon | null;
    onClose: () => void;
};

export default function CardModal({ visible, pokemon, onClose }: CardModalProps) {
    const { toggleFavorite, isFavorite } = useFavorites();

    if (!pokemon) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
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
                        resizeMode="contain"
                    />

                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(pokemon)}
                    >
                        <Text style={styles.favoriteText}>
                            {isFavorite(pokemon)
                                ? "★ Remover dos Favoritos"
                                : "☆ Adicionar aos Favoritos"}
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

// 🎨 Estilos do Modal
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
    image: {
        width: 320,
        height: 420,
        borderRadius: 12,
        marginBottom: 20,
    },
    favoriteButton: {
        backgroundColor: "#ffec80",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    favoriteText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: "#ff3366",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
