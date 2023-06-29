import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import TypesComponent from './TypesComponent';
import { getDarkerColor, getLighterColor, getOpacityColor } from '../utils/colorUtils';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    pokemon: PokemonFull;
    bgColor: string;
}

const pokemonTypesUrl = 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/';

export const PokemonDetails = ({ pokemon, bgColor }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(0);

    const toggleModal = (index: number) => {
        setSelectedSpriteIndex(index);
        setModalVisible(!modalVisible);
    };

    const swiperRef = useRef<Swiper>(null);

    return (
        <ScrollView style={{ ...StyleSheet.absoluteFillObject }} showsVerticalScrollIndicator={false}>
            {/* Name */}
            {/* Types */}
            <TypesComponent pokemon={pokemon} pokemonTypesUrl={pokemonTypesUrl} />

            {/* Weight */}
            <View style={{ ...styles.container, ...styles.sectionContainer }}>
                <Text style={styles.sectionTitle}>Weight</Text>
                <Text style={styles.sectionText}>{pokemon.weight} kg</Text>
            </View>

            {/* Sprites */}
            <View style={{ ...styles.container, ...styles.sectionContainer }}>
                <Text style={styles.sectionTitle}>Sprites</Text>
            </View>
            <ScrollView
                style={styles.spriteScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {pokemon.sprites.front_default && (
                    <TouchableOpacity onPress={() => toggleModal(0)}>
                        <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
                    </TouchableOpacity>
                )}
                {pokemon.sprites.back_default && (
                    <TouchableOpacity onPress={() => toggleModal(1)}>
                        <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
                    </TouchableOpacity>
                )}
                {pokemon.sprites.front_shiny && (
                    <TouchableOpacity onPress={() => toggleModal(2)}>
                        <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
                    </TouchableOpacity>
                )}
                {pokemon.sprites.back_shiny && (
                    <TouchableOpacity onPress={() => toggleModal(3)}>
                        <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
                    </TouchableOpacity>
                )}
            </ScrollView>
            <Modal visible={modalVisible} transparent onRequestClose={() => toggleModal(0)}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            ...styles.modalContainer,
                            backgroundColor: getOpacityColor(getDarkerColor(bgColor, 0.6), 0.85),
                        }}
                    >
                        <Swiper
                            ref={swiperRef}
                            loop={false}
                            index={selectedSpriteIndex}
                            dotColor={getDarkerColor(bgColor, 0.25)}
                            activeDotColor={getLighterColor(bgColor, 0.1)}
                            onIndexChanged={(index) => setSelectedSpriteIndex(index)}
                        >
                            {pokemon.sprites.front_default && (
                                <View style={styles.modalContent}>
                                    <FadeInImage uri={pokemon.sprites.front_default} style={styles.modalImage} />
                                </View>
                            )}
                            {pokemon.sprites.back_default && (
                                <View style={styles.modalContent}>
                                    <FadeInImage uri={pokemon.sprites.back_default} style={styles.modalImage} />
                                </View>
                            )}
                            {pokemon.sprites.front_shiny && (
                                <View style={styles.modalContent}>
                                    <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.modalImage} />
                                </View>
                            )}
                            {pokemon.sprites.back_shiny && (
                                <View style={styles.modalContent}>
                                    <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.modalImage} />
                                </View>
                            )}
                        </Swiper>
                        {/* Close button modal*/}
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => {
                                toggleModal(0);
                                swiperRef.current?.scrollTo(0, false);
                            }}
                        >
                            <Icon name="close" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Base Abilities */}
            <View style={{ ...styles.container, ...styles.sectionContainer }}>
                <Text style={styles.sectionTitle}>Base Abilities</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {pokemon.abilities.map(({ ability }) => (
                        <Text style={{ ...styles.sectionText, marginRight: 10 }} key={ability.name}>
                            {capitalizeFirstLetter(ability.name)}
                        </Text>
                    ))}
                </View>
            </View>

            {/* All Abilities */}
            <View style={{ ...styles.container, ...styles.sectionContainer }}>
                <Text style={styles.sectionTitle}>Moves</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {pokemon.moves.map(({ move }) => (
                        <Text style={{ ...styles.sectionText, marginRight: 10 }} key={move.name}>
                            {capitalizeFirstLetter(move.name)}
                        </Text>
                    ))}
                </View>
            </View>

            {/* Stats */}
            <View style={{ ...styles.container, ...styles.sectionContainer }}>
                <Text style={styles.sectionTitle}>Moves</Text>
                <View style={{ flexWrap: 'wrap' }}>
                    {pokemon.stats.map((stat, i) => (
                        <View key={stat.stat.name + i}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                        >
                            <Text style={{ ...styles.sectionText, marginRight: 10 }} key={stat.stat.name}>
                                {capitalizeFirstLetter(stat.stat.name)}
                            </Text>
                            <Text style={{ ...styles.sectionText, marginRight: 10, fontWeight: 'bold' }}>
                                {stat.base_stat}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Final Sprite */}
            <View style={{ ...styles.container, ...styles.sectionContainer, marginBottom: 22, alignContent: 'center', alignItems: 'center' }}>
                <FadeInImage uri={pokemon.sprites.front_default} style={{ width: 50, height: 50 }} />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    sectionContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    sectionText: {
        fontSize: 19,
        color: 'gray',
    },
    spriteScrollView: {
        flexDirection: 'row',
        marginTop: 0,
    },
    basicSprite: {
        width: 120,
        height: 120,
        marginRight: 5,
        marginLeft: 10,
    },
    modalCloseButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 25, // Adjust the top position as desired
        right: 25, // Adjust the right position as desired
        zIndex: 1,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '90%', // Adjust the width as desired
        height: '90%', // Adjust the height as desired
        resizeMode: 'contain',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
});

export default PokemonDetails;