// src/utils/colorUtils.ts
import tinycolor from 'tinycolor2';

//given a background color, return a secondary color to put text above it with contrast
export const getSecondaryColor = (backgroundColor: string) => {
    const color = tinycolor(backgroundColor);

    // Check if the background color is dark
    if (color.isDark()) {
        return color.lighten(33).toString(); // Lighten the color by 33%
    }

    // Background color is light
    return color.darken(33).toString(); // Darken the color by 33%
};


// given an image color and a % , return a darker color to put text above light backgrounds depending on the % of darkness
export const getDarkerColor = (imageColor: string, percentage: number = 0.25) => {
    const color = tinycolor(imageColor);
    percentage = percentage * 100;

    //increase darker by 25%
    return color.darken(percentage).toString();
}

// given an image color and a % , return a lighter color to put text above dark backgrounds depending on the % of lightness
export const getLighterColor = (imageColor: string, percentage: number = 0.25) => {
    const color = tinycolor(imageColor);
    percentage = percentage * 100;

    //increase lighter by 25%
    return color.lighten(percentage).toString();
}


//given a color and % of opacity return same color but apply opacity
export const getOpacityColor = (color: string, opacity: number) => {
    return tinycolor(color).setAlpha(opacity).toRgbString();
}
