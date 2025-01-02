var express = require("express");
var router = express.Router();
const { users, products } = require("../db"); // Asegúrate de tener acceso a tus bases de datos NeDB
const { verifyAuth, handleError } = require("../utils");

// Endpoint para generar el enlace de WhatsApp del pedido
router.get("/whatsapp-link", verifyAuth, (req, res) => {
  console.log(`GET request received to "/order/whatsapp-link"`);

  const { cart, addresses, username } = req.user;
  const address = addresses[0]?.address || "Dirección no disponible";
  let totalParcial = 0;
  let productosTexto = [];

  // Usar Promesas para manejar las consultas de productos
  Promise.all(cart.map(item => {
    return new Promise((resolve, reject) => {
      products.findOne({ _id: item.productId }, (err, product) => {
        if (err || !product) {
          return reject('Producto no encontrado');
        }
        const costoParcial = product.cost * item.qty;
        totalParcial += costoParcial;
        productosTexto.push(`- ${item.qty} ${product.name} $${product.cost}`);
        resolve();
      });
    });
  }))
  .then(() => {
    // Crear el mensaje
    const mensaje = `Hola, este es mi pedido.\nCliente: ${username}\nDireccion: ${address}\nProductos:\n${productosTexto.join('\n')}\nTotal parcial: $${totalParcial}`;
    
    // Crear el enlace de WhatsApp con el número específico
    const numeroWhatsApp = '573164121112'; // Reemplaza con tu número en formato internacional sin '+'
    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    res.status(200).json({ link: enlaceWhatsApp });
  })
  .catch(error => {
    handleError(res, error);
  });
});

module.exports = router;
