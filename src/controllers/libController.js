import { getData, saveData } from '../models/libmodel.js';

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