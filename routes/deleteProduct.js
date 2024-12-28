var express = require("express");
var router = express.Router();
const { handleError } = require("../utils");
const { products } = require("../db"); // Asegúrate de que `products` sea la base de datos NeDB

// Endpoint para eliminar un producto por su nombre (usando POST)
router.post("/", (req, res) => {
  const { name } = req.body;

  // Verificar que se pase el campo necesario
  if (!name) {
    return res.status(400).json({ error: "The 'name' field is required" });
  }

  // Buscar y eliminar el producto en la base de datos
  products.remove({ name }, {}, (err, numRemoved) => {
    if (err) {
      return handleError(res, err);
    }

    // Verificar si se eliminó algún producto
    if (numRemoved === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Compactar la base de datos para eliminar registros marcados como `$$deleted`
    products.persistence.compactDatafile();

    return res.status(200).json({ message: "Product deleted successfully", removedCount: numRemoved });
  });
});

module.exports = router;
