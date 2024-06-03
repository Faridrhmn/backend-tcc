const express = require("express");
const router = express.Router();
const controllerBuku = require("./controllers/controllerBuku");
const controllerPenerbit = require("./controllers/controllerPenerbit");

// Book routes
router.post('/books', controllerBuku.create);
router.delete('/books/:idBuku', controllerBuku.delete);
router.put('/books/:idBuku', controllerBuku.update);
router.get('/books/lowest-stock', controllerBuku.getLowestStockBook);
router.get('/books/lowest', controllerBuku.getLow);
router.get('/books', controllerBuku.getAll);
router.get('/books/search', controllerBuku.searchByName);
router.get('/books/:idBuku', controllerBuku.getById);

// Penerbit routes
router.post('/penerbits', controllerPenerbit.create);
router.delete('/penerbits/:idPenerbit', controllerPenerbit.delete);
router.put('/penerbits/:idPenerbit', controllerPenerbit.update);
router.get('/penerbits', controllerPenerbit.getAll);
router.get('/penerbits/:idPenerbit', controllerPenerbit.findById);

module.exports = router;
