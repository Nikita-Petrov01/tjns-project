const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const tokenRouter = require('./routes/tokenRouter');
const reviewRouter = require('./routes/reviewRouter');
const orderRouter = require('./routes/orderRouter');
const routerOrderItem = require('./routes/routerOrderItem');
const addressRouter = require('./routes/addressRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/token', tokenRouter);

app.use('/api/reviews', reviewRouter);

app.use('/api/orders', orderRouter);

app.use('/api/orderItems', routerOrderItem);

app.use('/api/addresses', addressRouter);



module.exports = app;
