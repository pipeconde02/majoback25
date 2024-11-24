var express = require("express");
var router = express.Router();
const { handleError } = require("../utils");
const { products } = require("../db");

router.post("/", (req, res) => {
  console.log("Request received for creating new product");

  const { name, category, cost, rating, image } = req.body;

  // Verificar que se hayan pasado los campos necesarios
  if (!name || !category || !cost || !rating || !image) {
    return res.status(400).json({ error: "All fields (name, category, cost, rating, image) are required" });
  }

  // Crear nuevo producto
  const newProduct = {
    _id: new Date().toISOString(), // Generación de un ID único temporal basado en la fecha
    name,
    category,
    cost,
    rating,
    image,
  };

  // Insertar el nuevo producto en la base de datos
  products.insertOne(newProduct, (err, result) => {
    if (err) {
      return handleError(res, err);
    }

    return res.status(201).json({ message: "New product created successfully", product: newProduct });
  });
});

module.exports = router;
