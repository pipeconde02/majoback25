const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');

// Nuevas rutas para editar y crear productos
const editRouter = require('./routes/edit');
const newproRouter = require('./routes/newpro');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/user', userRouter);

// Nuevas rutas para editar y agregar productos
app.use('/api/v1/edit', editRouter);  // Asegúrate de que esta ruta esté bien configurada
app.use('/api/v1/newpro', newproRouter);

const port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`QKart Backend running at port ${port}`);
});
