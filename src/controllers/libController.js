import { getData, saveData } from '../models/libmodel.js';
import {countOccurrenceOfItems, getUniqueValues, getAuthorWithMostBooks, delay} from "../services/libService.js";
import axios from "axios";
import * as cheerio from "cheerio";
import config from "../config/config.js";

export const getAllBooks = (req, res) => {
    try {
        const data = getData();
        res.status(200).json({ status: 200, data, message: "Books retrieved successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error reading data" });
    }
};

export const createBook = (req, res) => {
    try {
        const data = getData();
        const newBook = { id: data.length + 1, ...req.body };

        data.push(newBook);
        saveData(data);

        res.status(201).json({ status: 201, data: newBook, message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error adding book" });
    }
};

export const updateBook = (req, res) => {
    try {
        const { id } = req.params;
        const data = getData();
        const bookIndex = data.findIndex((book) => book.id == id);

        if (bookIndex === -1) {
            return res.status(404).json({ status: 404, message: "Book not found" });
        }

        data[bookIndex] = { ...data[bookIndex], ...req.body };
        saveData(data);

        res.status(200).json({ status: 200, data: data[bookIndex], message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error updating book" });
    }
};

export const deleteBook = (req, res) => {
    try {
        const { id } = req.params;
        const data = getData();
        const newData = data.filter((book) => book.id != id);

        if (data.length === newData.length) {
            return res.status(404).json({ status: 404, message: "Book not found" });
        }

        saveData(newData);

        res.status(200).json({ status: 200, message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error deleting book" });
    }
};

export const filterBooksByParam = (req, res) => {
    try {
        const { param, value } = req.params;
        const data = getData();
        const filteredData = data.filter((item) => item[param] == value);

        res.status(200).json({ status: 200, data: filteredData, message: "Data filtered successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error filtering data" });
    }
};

export const getStats = (req, res) => {
    try {
        const data = getData();

        const authors = getUniqueValues(data, "author");
        const genres = data.map((item) => item.genre);

        let mostUsedGenre = {
            name: null,
            nbrBooks: 0
        }

        countOccurrenceOfItems(genres).forEach( (item) => {

            if( item.occurrenceNumber >= mostUsedGenre.nbrBooks )
            {
                mostUsedGenre = {
                    name: item.name,
                    nbrBooks: item.occurrenceNumber
                }
            }

        })

        let stats = {
            numberOfBooks: data.length,
            numberOfAuthors: authors.length,
            authorWithMostBooks: getAuthorWithMostBooks(authors),
            mostUsedGenre,

        };

        res.status(200).json({ status: 200, data: stats, message: "Data resumed successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error while getting stats" });
    }
}

export const scrapSite = async (req, res) => {

    try
    {
        let start = 0;
        for (let i = 1; i < 2; i++)
        {
            const uri = `${config.atramentaURI}/lecture-libre/52-litterature-generale/?page=${i}&start=${start}`;
            console.log(`Scraping URL : ${uri}`);

            const { data } = await axios.get(config.atramentaURI, {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            });

            // Charger le HTML avec Cheerio
            const $ = cheerio.load(data);

            let titles = [];
            $("h1").each((index, element) => {
                titles.push($(element).text().trim());
            });

            console.log(`Titres trouvés sur ${uri} :`, titles);

            start+=10;

            console.log(`Scrapping done ! Wait ${config.scrapingDelay/1000}s before next call`)
            // Introduire un délai de 20 secondes avant la prochaine requête
            await delay(config.scrapingDelay);
        }

        res.status(200).json({ status: 200, data: {}, message: "Data scrapped successfully" });

    } catch (error) {
        console.error("Error while scraping :", error.message);
        res.status(500).json({ status: 500, message: "Error while getting books data from outside website" });
    }
}