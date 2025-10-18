
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useFavorites } from "./FavoritesContext";
import { Pokemon } from "./Pokemon";
import PokemonModal from "../(modals)/PokemonModal";


// ⚙️ Gerado automaticamente — não editar manualmente
export const pokemonImages33 = {
    "chain_1/bulbasaur": require("@/assets/evo/chain_1/bulbasaur.png"),
    "chain_1/ivysaur": require("@/assets/evo/chain_1/ivysaur.png"),
    "chain_1/venusaur": require("@/assets/evo/chain_1/venusaur.png"),
    "chain_10/pichu": require("@/assets/evo/chain_10/pichu.png"),
    "chain_10/pikachu": require("@/assets/evo/chain_10/pikachu.png"),
    "chain_10/raichu": require("@/assets/evo/chain_10/raichu.png"),
    "chain_11/sandshrew": require("@/assets/evo/chain_11/sandshrew.png"),
    "chain_11/sandslash": require("@/assets/evo/chain_11/sandslash.png"),
    "chain_12/nidoqueen": require("@/assets/evo/chain_12/nidoqueen.png"),
    "chain_12/nidoran-f": require("@/assets/evo/chain_12/nidoran-f.png"),
    "chain_12/nidorina": require("@/assets/evo/chain_12/nidorina.png"),
    "chain_13/nidoking": require("@/assets/evo/chain_13/nidoking.png"),
    "chain_13/nidoran-m": require("@/assets/evo/chain_13/nidoran-m.png"),
    "chain_13/nidorino": require("@/assets/evo/chain_13/nidorino.png"),
    "chain_14/clefable": require("@/assets/evo/chain_14/clefable.png"),
    "chain_14/clefairy": require("@/assets/evo/chain_14/clefairy.png"),
    "chain_14/cleffa": require("@/assets/evo/chain_14/cleffa.png"),
    "chain_15/ninetales": require("@/assets/evo/chain_15/ninetales.png"),
    "chain_15/vulpix": require("@/assets/evo/chain_15/vulpix.png"),
    "chain_16/igglybuff": require("@/assets/evo/chain_16/igglybuff.png"),
    "chain_16/jigglypuff": require("@/assets/evo/chain_16/jigglypuff.png"),
    "chain_16/wigglytuff": require("@/assets/evo/chain_16/wigglytuff.png"),
    "chain_17/crobat": require("@/assets/evo/chain_17/crobat.png"),
    "chain_17/golbat": require("@/assets/evo/chain_17/golbat.png"),
    "chain_17/zubat": require("@/assets/evo/chain_17/zubat.png"),
    "chain_18/gloom": require("@/assets/evo/chain_18/gloom.png"),
    "chain_18/oddish": require("@/assets/evo/chain_18/oddish.png"),
    "chain_18/vileplume": require("@/assets/evo/chain_18/vileplume.png"),
    "chain_19/paras": require("@/assets/evo/chain_19/paras.png"),
    "chain_19/parasect": require("@/assets/evo/chain_19/parasect.png"),
    "chain_2/charizard": require("@/assets/evo/chain_2/charizard.png"),
    "chain_2/charmander": require("@/assets/evo/chain_2/charmander.png"),
    "chain_2/charmeleon": require("@/assets/evo/chain_2/charmeleon.png"),
    "chain_20/venomoth": require("@/assets/evo/chain_20/venomoth.png"),
    "chain_20/venonat": require("@/assets/evo/chain_20/venonat.png"),
    "chain_21/diglett": require("@/assets/evo/chain_21/diglett.png"),
    "chain_21/dugtrio": require("@/assets/evo/chain_21/dugtrio.png"),
    "chain_22/meowth": require("@/assets/evo/chain_22/meowth.png"),
    "chain_22/persian": require("@/assets/evo/chain_22/persian.png"),
    "chain_23/golduck": require("@/assets/evo/chain_23/golduck.png"),
    "chain_23/psyduck": require("@/assets/evo/chain_23/psyduck.png"),
    "chain_24/annihilape": require("@/assets/evo/chain_24/annihilape.png"),
    "chain_24/mankey": require("@/assets/evo/chain_24/mankey.png"),
    "chain_24/primeape": require("@/assets/evo/chain_24/primeape.png"),
    "chain_25/arcanine": require("@/assets/evo/chain_25/arcanine.png"),
    "chain_25/growlithe": require("@/assets/evo/chain_25/growlithe.png"),
    "chain_26/poliwag": require("@/assets/evo/chain_26/poliwag.png"),
    "chain_26/poliwhirl": require("@/assets/evo/chain_26/poliwhirl.png"),
    "chain_26/poliwrath": require("@/assets/evo/chain_26/poliwrath.png"),
    "chain_27/abra": require("@/assets/evo/chain_27/abra.png"),
    "chain_27/alakazam": require("@/assets/evo/chain_27/alakazam.png"),
    "chain_27/kadabra": require("@/assets/evo/chain_27/kadabra.png"),
    "chain_28/machamp": require("@/assets/evo/chain_28/machamp.png"),
    "chain_28/machoke": require("@/assets/evo/chain_28/machoke.png"),
    "chain_28/machop": require("@/assets/evo/chain_28/machop.png"),
    "chain_29/bellsprout": require("@/assets/evo/chain_29/bellsprout.png"),
    "chain_29/victreebel": require("@/assets/evo/chain_29/victreebel.png"),
    "chain_29/weepinbell": require("@/assets/evo/chain_29/weepinbell.png"),
    "chain_3/blastoise": require("@/assets/evo/chain_3/blastoise.png"),
    "chain_3/squirtle": require("@/assets/evo/chain_3/squirtle.png"),
    "chain_3/wartortle": require("@/assets/evo/chain_3/wartortle.png"),
    "chain_30/tentacool": require("@/assets/evo/chain_30/tentacool.png"),
    "chain_30/tentacruel": require("@/assets/evo/chain_30/tentacruel.png"),
    "chain_4/butterfree": require("@/assets/evo/chain_4/butterfree.png"),
    "chain_4/caterpie": require("@/assets/evo/chain_4/caterpie.png"),
    "chain_4/metapod": require("@/assets/evo/chain_4/metapod.png"),
    "chain_5/beedrill": require("@/assets/evo/chain_5/beedrill.png"),
    "chain_5/kakuna": require("@/assets/evo/chain_5/kakuna.png"),
    "chain_5/weedle": require("@/assets/evo/chain_5/weedle.png"),
    "chain_6/pidgeot": require("@/assets/evo/chain_6/pidgeot.png"),
    "chain_6/pidgeotto": require("@/assets/evo/chain_6/pidgeotto.png"),
    "chain_6/pidgey": require("@/assets/evo/chain_6/pidgey.png"),
    "chain_7/raticate": require("@/assets/evo/chain_7/raticate.png"),
    "chain_7/rattata": require("@/assets/evo/chain_7/rattata.png"),
    "chain_8/fearow": require("@/assets/evo/chain_8/fearow.png"),
    "chain_8/spearow": require("@/assets/evo/chain_8/spearow.png"),
    "chain_9/arbok": require("@/assets/evo/chain_9/arbok.png"),
    "chain_9/ekans": require("@/assets/evo/chain_9/ekans.png"),
};


export default function PokemonListScreen() {
    const { toggleFavorite, isFavorite } = useFavorites();
    const [loading, setLoading] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // 🔹 Monta a lista base apenas com nome e imagem
    const data2: Pokemon[] = Object.entries(pokemonImages33).map(
        ([name, image], index) => {
            const cleanName = name.replace(/^chain_\d+\//, ""); // remove "chain_X/"
            return {
                id: `poke-${cleanName}-${index}`,
                name: cleanName,
                imageUrl: image,
                types: [],
                height: 0,
                weight: 0,
                abilities: [],
                stats: {},
                origin: "poke",
            };
        }
    );

    // 🔹 Quando clicar em um Pokémon, buscar detalhes na PokéAPI
    const handlePokemonPress = async (item: Pokemon) => {
        try {
            setLoading(true);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`);
            if (!res.ok) throw new Error("Pokémon não encontrado");
            const details = await res.json();

            const detailedPokemon: Pokemon = {
                ...item,
                types: details.types.map((t: any) => t.type.name),
                height: details.height / 10,
                weight: details.weight / 10,
                abilities: details.abilities.map((a: any) => a.ability.name),
                stats: details.stats.reduce(
                    (acc: Record<string, number>, s: any) => ({
                        ...acc,
                        [s.stat.name]: s.base_stat,
                    }),
                    {}
                ),
            };

            setSelectedPokemon(detailedPokemon);
            setModalVisible(true);
        } catch (error) {
            console.error("❌ Erro ao buscar detalhes:", error);
            setSelectedPokemon(item); // fallback básico
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !selectedPokemon) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#ffcc00" />
                <Text style={{ color: "#fff", marginTop: 8 }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Lista de Pokémons</Text>

            <FlatList
                data={data2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePokemonPress(item)}
                    >
                        <Image source={item.imageUrl} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                                <Text style={styles.favorite}>
                                    {isFavorite(item) ? "⭐" : "☆"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 🔹 Modal detalhado */}
            <PokemonModal
                visible={modalVisible}
                pokemon={selectedPokemon}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1b1b1b", padding: 20 },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffcc00",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        backgroundColor: "#2c2c2c",
        borderRadius: 14,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    image: { width: 80, height: 80, marginRight: 12, borderRadius: 8 },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        textTransform: "capitalize",
    },
    favorite: { fontSize: 26, color: "#ffcc00" },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b1b1b",
    },
});



















