import express from "express";
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', bookController.mostrarBooks);
router.get('/books/search/:query', bookController.searchBooks);
router.get('/books/search/precio/:minPrecio/:maxPrecio', bookController.searchBooksPorPrecio);
router.get('/books/:idBook',  bookController.mostrarBooks);
router.post('/books', bookController.nuevoBooks);    
router.put('/books', bookController.actualizarBooks);
router.delete('/books/:idBook', bookController.eliminarBooks);

export default router;



