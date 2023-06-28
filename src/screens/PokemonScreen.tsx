import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, ActivityIndicatorBase, ActivityIndicator, Dimensions } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

const { width } = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, bgColor, titleColor } = route.params;
    const { name, id, image } = simplePokemon;
    const { top } = useSafeAreaInsets();

    const nameUpper = capitalizeFirstLetter(name);

    const { isLoading, pokemon } = usePokemon(id);

    return (
        <View style={{ flex: 1 }}>

            {/* Header Container top color, image and title */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: bgColor,
            }}>

                <View
                    style={
                        {
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            marginTop: top + 5,
                        }
                    }
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ borderRadius: 100, }}
                        onPress={() => navigation.pop()}
                    >
                        <Icon
                            name="arrow-back-outline"
                            color={titleColor}
                            size={35}
                        />
                    </TouchableOpacity>

                    {/* Name of the pokemon */}
                    <Text
                        style={{
                            color: titleColor,
                            fontSize: width * 0.08, // Adjust the font size based on screen width
                            fontWeight: 'bold',
                        }}
                    >
                        {nameUpper} #{id}
                    </Text>
                </View>

                {/* White Pokeball */}
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={{
                        ...styles.whitePokeball,
                    }}
                />

                <FadeInImage
                    uri={image}
                    style={styles.pokemonImage}
                />
            </View>

            {/* Types and weight, bottom part screen*/}
            {
                isLoading ? (
                    <View style={styles.loadingIndicator}>
                        <ActivityIndicator
                            color={titleColor}
                            size={80}
                        />
                    </View>
                )
                    : <PokemonDetails pokemon={pokemon} bgColor={bgColor} />
            }

        </View>

    )
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        // alignSelf: 'flex-start',
        // left: 20,
        fontWeight: 'bold'
    },
    whitePokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
