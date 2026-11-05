import {
  authorHasBooks,
  createAuthor as createAuthorModel,
  deleteAuthor as deleteAuthorModel,
  getAllAuthors as getAllAuthorsModel,
  getAuthorById as getAuthorByIdModel,
  updateAuthor as updateAuthorModel
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsModel();
    return res.status(200).json(authors);
  } catch (error) {
    console.error('GET /authors failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAuthorById = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const author = await getAuthorByIdModel(requestedId);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('GET /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createAuthor = async (req, res) => {
  const { id, name, birthYear } = req.body || {};

  if (!id || !name || birthYear === undefined || birthYear === null) {
    return res.status(400).json({ message: 'id, name, and birthYear are required' });
  }

  try {
    const existingAuthor = await getAuthorByIdModel(id);

    if (existingAuthor) {
      return res.status(400).json({ message: 'Author id already exists' });
    }

    const author = { id, name, birthYear };
    await createAuthorModel(author);
    return res.status(201).json(author);
  } catch (error) {
    console.error('POST /authors failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAuthor = async (req, res) => {
  const requestedId = req.params.id;
  const { name, birthYear } = req.body || {};

  if (!name || birthYear === undefined || birthYear === null) {
    return res.status(400).json({ message: 'name and birthYear are required' });
  }

  try {
    const existingAuthor = await getAuthorByIdModel(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const author = { name, birthYear };
    await updateAuthorModel(requestedId, author);
    return res.status(200).json({ id: requestedId, ...author });
  } catch (error) {
    console.error('PUT /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAuthor = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const existingAuthor = await getAuthorByIdModel(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const hasBooks = await authorHasBooks(requestedId);

    if (hasBooks) {
      return res.status(409).json({ message: 'Author cannot be deleted while books reference it' });
    }

    await deleteAuthorModel(requestedId);
    return res.status(204).send();
  } catch (error) {
    console.error('DELETE /authors/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
