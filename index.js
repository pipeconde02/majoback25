const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const app = express();

app.use(cors());
app.use(express.json());

// Importar las rutas
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const orderRoutes = require("./routes/order");
const newProductRouter = require("./routes/newpro"); // Asegúrate de esta línea
const deleteProduct = require("./routes/deleteProduct");

// Usar las rutas en la aplicación
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/user', userRouter);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/newproduct", newProductRouter); // Ruta para crear productos
app.use("/api/v1/deleteProduct", deleteProduct);

const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`QKart Backend running at port ${port}`);
});
