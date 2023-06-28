import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { FlatList } from 'react-native-gesture-handler'
import { PokemonCard } from '../components/PokemonCard'
import Icon from 'react-native-vector-icons/Ionicons'


export const HomeScreen = () => {
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    const [searchText, setSearchText] = useState('');
    const [filteredPokemonList, setFilteredPokemonList] = useState(simplePokemonList);
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);


    useEffect(() => {
        filterPokemonList();
        setShowNoResultsMessage(false);
    }, [searchText, simplePokemonList]);

    useEffect(() => {
        // Set a timeout to show the no results message after 7 seconds
        const timeout = setTimeout(() => {
            if (searchText && filteredPokemonList.length === 0) {
                setShowNoResultsMessage(true);
            }
        }, 3 * 1000);

        return () => clearTimeout(timeout); // Clear the timeout on component unmount or when search text changes

    }, [searchText, filteredPokemonList]);


    const filterPokemonList = () => {
        if (searchText === '') {
            setFilteredPokemonList(simplePokemonList);
        } else {
            const filteredList = simplePokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredPokemonList(filteredList);
        }
    };

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />

            <View style={styles.container}>
                <Image
                    source={require('../assets/Pokedex_logo.png')}
                    style={styles.logo}
                />

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Pokemon"
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {showNoResultsMessage ? (
                    <React.Fragment>
                        <Text style={styles.noResultsMessage}>We don't know any Pokémon like this!</Text>
                        <Text style={{ ...styles.noResultsMessage, fontSize: 12 }}>We have {simplePokemonList.length} now in the Pokédex</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                backgroundColor: '#FFCB05',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 100,
                                marginTop: 10,
                            }}
                            onPress={() => {
                                loadPokemons()
                                setShowNoResultsMessage(false)
                            }}
                        >
                            <Text>Try load more pokemons</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                ) : filteredPokemonList.length > 0 ? (
                    <FlatList
                        data={filteredPokemonList}
                        keyExtractor={(pokemon) => pokemon.id}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
                        onEndReachedThreshold={0.4}
                        onEndReached={loadPokemons}
                        ListFooterComponent={
                            <ActivityIndicator size={20} color="grey" style={{ height: 100 }} />
                        }
                        contentContainerStyle={styles.flatListContent}
                    />
                ) : (
                    <ActivityIndicator size={20} color="grey" style={{ height: 100 }} />
                )}
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 35,
    },
    logo: {
        width: 250,
        height: 85,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    searchInput: {
        width: '90%',
        height: 40,
        backgroundColor: '#ECE8EC',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    flatListContent: {
        paddingTop: 16,
        paddingBottom: 100,
    },
    pokebolaBG: {
        position: 'absolute',
        width: 300,
        height: 300,
        top: -100,
        right: -100,
        opacity: 0.2,
    },
    noResultsMessage: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
        alignSelf: 'center',
        marginTop: 10,
    },
    gradientContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 150,
    },
});

export default HomeScreen;
