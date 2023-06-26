import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';


const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey');

    useEffect(() => {
        ImageColors.getColors(pokemon.image, { fallback: 'grey', cache: true, key: `${pokemon.id}` })
            .then(colors => {
                if (colors.platform === 'android') {
                    setBgColor(colors.dominant || 'blue')
                } else if (colors.platform === 'ios') {
                    setBgColor(colors.background || 'grey')
                }
                else {
                    setBgColor('blue')
                }
            });
    }, [pokemon]);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
        >
            <View
                style={{
                    ...styles.cardContainer,
                    width: windowWidth * 0.42,
                    backgroundColor: bgColor
                }}>
                <Text style={styles.name}>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>

                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokeball}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.image}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity >
    )
}



const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokeball: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 10
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    }
});
