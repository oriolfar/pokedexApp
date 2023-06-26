import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import styles from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { FlatList } from 'react-native-gesture-handler'
import { PokemonCard } from '../components/PokemonCard'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>

            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />

            <View
                style={{

                    alignItems: 'center'
                }}
            >

                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}

                    ListHeaderComponent={(
                        <Image
                            source={require('../assets/Pokedex_logo.png')}
                            style={{
                                width: 250,
                                height: 85,
                                alignSelf: 'center',
                                marginTop: top + 20,
                                marginBottom: 20,
                            }}
                        />
                    )}

                    numColumns={2}
                    renderItem={({ item: pokemon }) => (
                        <PokemonCard pokemon={pokemon} />
                    )}

                    onEndReachedThreshold={0.4}
                    onEndReached={loadPokemons}

                    ListFooterComponent={(
                        <ActivityIndicator
                            size={20}
                            color="grey"
                            style={{ height: 100 }}
                        />)}
                />
            </View>

        </>
    )
}
