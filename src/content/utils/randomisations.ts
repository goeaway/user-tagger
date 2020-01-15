import { RGB } from "../../common/types";

const randomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomRGBValue = () : RGB => {
    const R = randomBetween(0, 255);
    const G = randomBetween(0, 255);
    const B = randomBetween(0, 255);
    
    return { R, G, B };
}

export const getRandomTagName = () : string => {
    const possibles = [
        "troll", 
        "friendly", 
        "fake news", 
        "cat lover", 
        "don't trust",
        "was mean to me once",
        "likes X",
        "hates Y",
        "frequents a place"
    ];

    return possibles[randomBetween(0, possibles.length - 1)];
}