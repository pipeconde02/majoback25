var express = require("express");
var router = express.Router();
const { handleError } = require("../utils");
const { products } = require("../db"); // Asegúrate de que `products` sea la base de datos NeDB

// Función para generar un ID único en el formato deseado
function generateProductId() {
  const randomPrefix = '14_01_Ro_';
  const randomSuffix = Math.floor(Math.random() * 1000); // Número aleatorio de 0 a 999
  return `${randomPrefix}${String(randomSuffix).padStart(3, '0')}`;
}

router.post("/", (req, res) => {
  console.log("Request received for creating new product");

  const { name, category, cost, rating, image } = req.body;

  // Verificar que se hayan pasado los campos necesarios
  if (!name || !category || !cost || !rating || !image) {
    return res.status(400).json({ error: "All fields (name, category, cost, rating, image) are required" });
  }

  // Crear nuevo producto con las claves en el orden deseado
  const newProduct = {
    name,
    category,
    cost,
    rating,
    image,
    _id: generateProductId(), // Generar un ID único según el formato deseado
  };

  // Insertar el nuevo producto en la base de datos (usando `insert` para NeDB)
  products.insert(newProduct, (err, newProductInserted) => {
    if (err) {
      return handleError(res, err);
    }

    return res.status(201).json({ message: "New product created successfully", product: newProductInserted });
  });
});

module.exports = router;
