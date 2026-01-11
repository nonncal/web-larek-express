import express  from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import path from 'path';
import productsRouter from "./routes/product";
import orderRouter from "./routes/order";
const cors = require('cors');

const {PORT} = process.env;
const {DB_ADDRESS} = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(String(DB_ADDRESS));

app.use('/order', orderRouter);
app.use('/product', productsRouter);

app.listen(Number(PORT), () => console.log(`Listening on port ${PORT}`));
