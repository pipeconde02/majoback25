const express = require('express');
const router = express.Router();
const { products } = require('../db');

// Ruta para actualizar un producto
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  // Actualizar el producto con el ID proporcionado
  products.update(
    { _id: productId },             // Criterio de búsqueda
    { $set: updatedData },          // Datos a actualizar
    {},                             // Sin opciones (ni multi ni upsert)
    (err, numUpdated) => {
      if (err) {
        console.error('Error updating product:', err);
        return res.status(500).json({ message: 'Error updating product', error: err });
      }

      // Verificar si se actualizó algún documento
      if (numUpdated > 0) {
        return res.json({ message: 'Product updated successfully', numUpdated });
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    }
  );
});

module.exports = router;
