import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <Image
                    source={require('@/assets/images/header-pokemon.jpg')}
                    style={{ width: '100%', height: 250, resizeMode: 'cover' }}
                />
            }>

            {/* 🔹 Título principal */}
            <ThemedView style={styles.titleContainer}>
                <ThemedText
                    type="title"
                    style={{
                        fontFamily: Fonts.rounded,
                    }}>
                    Explore
                </ThemedText>
            </ThemedView>

            <ThemedText style={styles.subtitle}>
                Bem-vindo à seção de informações do projeto 👨‍💻
            </ThemedText>

            {/* 🔸 INTEGRANTES */}
            <Collapsible title="Equipe de Desenvolvimento">
                <ThemedText style={styles.text}>
                    Este projeto foi desenvolvido pelos seguintes integrantes:
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={styles.member}>
                    • Matheus Braschi Haliski
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={styles.member}>
                    • Bryan Strey
                </ThemedText>

                <ThemedText style={[styles.text, { marginTop: 6 }]}>
                    Ambos atuaram no desenvolvimento técnico e integração das APIs.
                </ThemedText>
            </Collapsible>

            {/* 🔸 APIs UTILIZADAS */}
            <Collapsible title="APIs Utilizadas">
                <ThemedText style={styles.text}>
                    As principais APIs utilizadas neste projeto foram:
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={styles.apiItem}>
                    🧩 PokéAPI — Fornece informações sobre Pokémon, evoluções e tipos.
                </ThemedText>
                <ExternalLink href="https://pokeapi.co/">
                    <ThemedText type="link">https://pokeapi.co/</ThemedText>
                </ExternalLink>
                <ExternalLink href="https://pokeapi.co/api/v2/evolution-chain/">
                    <ThemedText type="link">https://pokeapi.co/api/v2/evolution-chain/</ThemedText>
                </ExternalLink>

                <ExternalLink href="https://api.pokemontcg.io/v2/cards?pageSize=20">
                    <ThemedText type="link"> https://api.pokemontcg.io/v2/cards?pageSize=20</ThemedText>
                </ExternalLink>
                <ThemedText type="defaultSemiBold" style={styles.apiItem}>
                    ⚙️ React Native Reanimated — Utilizada para criar animações e transições suaves.
                </ThemedText>
                <ExternalLink href="https://docs.swmansion.com/react-native-reanimated/">
                    <ThemedText type="link">Documentação Reanimated</ThemedText>
                </ExternalLink>

                <ThemedText type="defaultSemiBold" style={styles.apiItem}>
                    🌈 Expo Image — Usada para otimizar e exibir imagens de alta performance.
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/image/">
                    <ThemedText type="link">Expo Image Docs</ThemedText>
                </ExternalLink>

                <ThemedText type="defaultSemiBold" style={styles.apiItem}>
                    💫 Expo Router — Controla a navegação entre as telas da aplicação.
                </ThemedText>
                <ExternalLink href="https://docs.expo.dev/router/introduction/">
                    <ThemedText type="link">Expo Router Docs</ThemedText>
                </ExternalLink>
            </Collapsible>

            {/* 🔸 OUTRAS INFORMAÇÕES */}
            <Collapsible title="Sobre o Projeto">
                <ThemedText style={styles.text}>
                    Este aplicativo foi criado como parte de um projeto de estudos de uma Pokedex (Pokemon) e demonstração de uso de
                    múltiplas APIs e bibliotecas do ecossistema Expo + React Native.
                </ThemedText>

                <ThemedText style={styles.text}>
                    O foco é apresentar uma experiência visual interativa, animações fluidas e integração
                    com fontes de dados externas.
                </ThemedText>
            </Collapsible>

            {/* 🔸 Exemplo de imagem */}
            <Collapsible title="Logo e identidade visual">
                <ThemedText style={styles.text}>
                    O projeto utiliza ícones e imagens otimizadas, garantindo desempenho e design consistente.
                </ThemedText>

                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }}
                />
            </Collapsible>

            {/* 🔸 Animações e Parallax */}
            <Collapsible title="Animações e Parallax">
                <ThemedText style={styles.text}>
                    A tela atual utiliza o componente <ThemedText type="defaultSemiBold">ParallaxScrollView</ThemedText>,
                    que adiciona um belo efeito de movimento no cabeçalho. A biblioteca{' '}
                    <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
                        react-native-reanimated
                    </ThemedText>{' '} também está integrada para animações suaves.
                </ThemedText>

                {Platform.select({
                    ios: (
                        <ThemedText style={styles.text}>
                            No iOS, o cabeçalho apresenta um efeito de profundidade (parallax) ao rolar a página.
                        </ThemedText>
                    ),
                })}
            </Collapsible>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    subtitle: {
        marginBottom: 12,
        fontSize: 15,
        color: '#10100f',
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
    member: {
        fontSize: 15,
        color: '#10100f',
        marginVertical: 2,
    },
    apiItem: {
        marginTop: 10,
        fontSize: 14,
        color: '#10100f',
    },
});
