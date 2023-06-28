import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { getImageColorFromUrl } from '../utils/imageColors';
import { FadeInImage } from './FadeInImage';
import { getDarkerColor } from '../utils/colorUtils';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

interface Props {
    pokemon: PokemonFull;
    pokemonTypesUrl: string; // Added type for the pokemonTypesUrl prop
}

const TypesComponent = ({ pokemon, pokemonTypesUrl }: Props) => {


    return (
        <View style={{ ...styles.container, marginTop: 375 }}>
            <Text style={styles.title}>Types</Text>
            <View style={{ flexDirection: 'row' }}>
                {pokemon.types.map(({ type }) => {
                    const [color, setColor] = useState('grey');

                    useEffect(() => {
                        const fetchColor = async () => {
                            const imageColor = await getImageColorFromUrl(`${pokemonTypesUrl}${type.name}.png`);
                            setColor(getDarkerColor(imageColor) || 'grey');
                        };
                        fetchColor();
                    }, [type.name]);

                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} key={type.name}>
                            <Text
                                style={{
                                    ...styles.regularText,
                                    ...styles.typesText,
                                    color: color,
                                }}
                            >
                                {capitalizeFirstLetter(type.name)}
                            </Text>
                            <FadeInImage uri={`${pokemonTypesUrl}${type.name}.png`} style={styles.typeImage} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19,
    },
    typesText: {
        marginTop: 5,
        marginRight: 9,
    },
    typeImage: {
        width: 21,
        height: 21,
        marginRight: 9,
        marginTop: 4,
    },

});

export default TypesComponent;
