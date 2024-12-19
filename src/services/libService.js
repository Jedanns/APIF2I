import {getData} from "../models/libModel.js";

export const getUniqueValues = (array, key) => {

    if( !(Array.isArray(array)) )
    {
        throw new Error("parameter is not array !")
    }

    array.forEach( item => {
        if( !item.hasOwnProperty( key ) )
            throw new Error("All items in your array doesn't have given key !")
    });

    // exclusion des doublons dans le tableau
    return [...new Set(array.map((item) => item[key])) ];
};

export const countOccurrenceOfItems = (array) => {

    if( !(Array.isArray(array)) )
    {
        throw new Error("parameter is not array !")
    }

    let output = [];

    array.forEach( item => {

        let index = output.findIndex( itemMemorized => itemMemorized.name === item );

        if( -1 !== index )
        {
            output[index].occurrenceNumber += 1;
        }
        else
        {
            output.push({ name: item, occurrenceNumber: 1 })
        }

    })

    return output;
};

export const getAuthorBooks = (author) => {
    return getData().filter((item) => item.author == author);
}

export const getAuthorWithMostBooks = (authors) => {

    if( !(Array.isArray(authors)) )
    {
        throw new Error("parameter is not array !")
    }

    let authorWithMostBooks = {
        name: null,
        nbrBooks: 0
    };

    authors.forEach((author) => {

        const authorBooks = getAuthorBooks(author);

        if( authorWithMostBooks.nbrBooks <= authorBooks.length )
        {
            authorWithMostBooks= {
                name: author,
                nbrBooks: authorBooks.length
            };
        }

    })

    return authorWithMostBooks;
};

// Fonction pour introduire un délai
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));