import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';
import { getSecondaryColor } from '../utils/colorUtils';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { getImageColors } from '../utils/imageColors';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
    const [bgColor, setBgColor] = useState('grey');
    const isMounted = React.useRef(true);
    const navigation = useNavigation();

    useEffect(() => {
        const pokemonId = parseInt(pokemon.id, 10);

        getImageColors(pokemon.image, pokemonId)
            .then(colors => {
                if (!isMounted.current) return;

                if (colors.platform === 'android') {
                    setBgColor(colors.dominant || 'blue');
                } else if (colors.platform === 'ios') {
                    setBgColor(colors.background || 'grey');
                } else {
                    setBgColor('blue');
                }
            })
            .catch(err => {
                console.log(err, pokemon.name, pokemon.image);
            });
        return () => {
            isMounted.current = false;
        };
    }, [pokemon]);

    const secondaryColor = getSecondaryColor(bgColor);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
                navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon,
                    bgColor: bgColor,
                    titleColor: secondaryColor,
                })
            }
        >
            <View
                style={{
                    ...styles.cardContainer,
                    width: windowWidth * 0.42,
                    backgroundColor: bgColor,
                }}
            >
                <Text
                    style={{
                        ...styles.name,
                        color: secondaryColor,
                    }}
                >
                    {capitalizeFirstLetter(pokemon.name)}
                    {'\n#' + pokemon.id}
                </Text>

                <View style={{
                    ...styles.pokeballContainer,
                    width: windowWidth * 0.3,
                    height: windowWidth * 0.3
                }}>
                    <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokeball} />
                </View>

                <FadeInImage uri={pokemon.image} style={{
                    ...styles.pokemonImage,
                    width: windowWidth * 0.25,
                    height: windowWidth * 0.25
                }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 4
    },
    pokeballContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    },
});
