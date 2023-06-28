// src/utils/imageColors.ts
import ImageColors from 'react-native-image-colors';

export const getImageColors = (image: string, pokemonId: number) => {
    return ImageColors.getColors(image, {
        fallback: 'grey',
        cache: true,
        key: `${pokemonId}`,
    });
};

export const getImageColorFromUrl = async (url: string): Promise<string> => {
    try {
        const result = await ImageColors.getColors(url, {
            fallback: 'grey',
            cache: true,
        });

        if (result.platform === 'android') {
            return result.dominant || 'grey'; // Handle undefined value by providing a default 'grey' color
        } else if (result.platform === 'ios') {
            return result.background || 'grey'; // Handle undefined value by providing a default 'grey' color
        }
    } catch (error) {
        console.error('Error getting image colors:', error);
    }

    return 'grey';
};

