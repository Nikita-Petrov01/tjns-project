const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const categoryIdRouter = require('./routes/categoryRouter');
const tokenRouter = require('./routes/tokenRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryIdRouter);

app.use('/api/token', tokenRouter);

module.exports = app;