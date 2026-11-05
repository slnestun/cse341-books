import {
  createBook as createBookModel,
  deleteBook as deleteBookModel,
  getAllBooks,
  getBookById as getBookByIdModel,
  updateBook as updateBookModel
} from '../models/books.js';
import { getAuthorById as getAuthorByIdModel } from '../models/authors.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookByIdModel(requestedId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createBook = async (req, res) => {
  const { id, authorId, title, publicationDate } = req.body || {};

  if (!id || !authorId || !title || !publicationDate) {
    return res.status(400).json({ message: 'id, authorId, title, and publicationDate are required' });
  }

  try {
    const existingBook = await getBookByIdModel(id);

    if (existingBook) {
      return res.status(400).json({ message: 'Book id already exists' });
    }

    const author = await getAuthorByIdModel(authorId);

    if (!author) {
      return res.status(400).json({ message: 'authorId must match an existing author' });
    }

    const book = { id, authorId, title, publicationDate };
    await createBookModel(book);
    return res.status(201).json(book);
  } catch (error) {
    console.error('POST /books failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  const requestedId = req.params.id;
  const { authorId, title, publicationDate } = req.body || {};

  if (!authorId || !title || !publicationDate) {
    return res.status(400).json({ message: 'authorId, title, and publicationDate are required' });
  }

  try {
    const existingBook = await getBookByIdModel(requestedId);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const author = await getAuthorByIdModel(authorId);

    if (!author) {
      return res.status(400).json({ message: 'authorId must match an existing author' });
    }

    const book = { authorId, title, publicationDate };
    await updateBookModel(requestedId, book);
    return res.status(200).json({ id: requestedId, ...book });
  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const existingBook = await getBookByIdModel(requestedId);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await deleteBookModel(requestedId);
    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getBooksHandler, getBookByIdHandler, createBook, updateBook, deleteBook };
