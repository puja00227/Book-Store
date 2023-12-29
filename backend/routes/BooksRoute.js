import express from "express";
import { Book } from "../models/BookModels.js";

const router = express.Router()


// create a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.summary
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, summary',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            summary: request.body.summary,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.summary
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, summary',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Delete all books
router.delete('/', async (request, response) => {
    try {
        const result = await Book.deleteMany({});
        if (result.deletedCount === 0) {
            return response.status(404).json({ message: 'No books found to delete' });
        }
        return response.status(200).json({ message: 'All books deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});


// check box
router.put('/complete/:id', async (request, response) => {
    const { id } = request.params;
    const book = await Book.findById(id);
    book.complete = !book.complete
    book.save()
    response.json(book.complete)
});

export default router;
