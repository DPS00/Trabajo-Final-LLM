import express from "express";
import * as clothesController from '../controllers/clothesController.js';

const router = express.Router();

router.get('/clothes', clothesController.mostrarClothes);
router.get('/clothes/search/:query', clothesController.searchClothes);
router.get('/clothes/search/precio/:minPrecio/:maxPrecio', clothesController.searchClothesPorPrecio);
router.get('/clothes/:idClothes',  clothesController.showClothesyById);
router.post('/clothes', clothesController.nuevoClothes);    
router.put('/clothes', clothesController.actualizarClothes);
router.delete('/clothes/:idClothes', clothesController.eliminarClothes);

export default router;



