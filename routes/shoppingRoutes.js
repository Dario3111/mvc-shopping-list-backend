// routes/shoppingRoutes.js
const express = require("express");
const router = express.Router();
const shoppingController = require("../controllers/shoppingController");

// GET /items - Obtener todos los artículos
router.get("/items", shoppingController.getItems);

// POST /items - Agregar un nuevo artículo
router.post("/items", shoppingController.addItem);

// DELETE /items/:id - Eliminar un artículo
router.delete("/items/:id", shoppingController.deleteItem);

module.exports = router;
