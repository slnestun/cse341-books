import express from 'express';
import {
  createBook,
  deleteBook,
  getBookByIdHandler,
  getBooksHandler,
  updateBook
} from './controllers/books.js';
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Example Book Title
 *               publicationDate:
 *                 type: string
 *                 example: 2026-01-15
 *           example:
 *             id: b4
 *             authorId: a1
 *             title: Example Book Title
 *             publicationDate: 2026-01-15
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid book data, duplicate id, or unknown author id
 *       500:
 *         description: Unable to create book
 */
router.post('/books', createBook);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a2
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 example: 2026-02-20
 *           example:
 *             authorId: a2
 *             title: Updated Book Title
 *             publicationDate: 2026-02-20
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book data or unknown author id
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to update book
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to delete book
 */
router.delete('/books/:id', deleteBook);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthYear:
 *                 type: integer
 *                 example: 1980
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid author data or duplicate author id
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get one author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom author id, such as a1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom author id, such as a1
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Author
 *               birthYear:
 *                 type: integer
 *                 example: 1981
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom author id, such as a1
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted while books reference it
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthor);

export default router;
