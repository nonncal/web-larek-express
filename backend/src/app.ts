import express  from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import path from 'path';
import productsRouter from "./routes/product";
import orderRouter from "./routes/order";
import errorHandler from "./middlewares/errorHandler";
import { errors } from "celebrate";
import { NotFoundError } from "./errors";
import { requestLogger, errorLogger } from "./middlewares/logger";

const cors = require('cors');

const {PORT} = process.env;
const {DB_ADDRESS} = process.env;

const app = express();
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(String(DB_ADDRESS));

app.use(requestLogger);

app.use('/order', orderRouter);
app.use('/product', productsRouter);

app.use((req, res, next) => {next(new NotFoundError('Запрашиваемый ресурс не найден'))});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(Number(PORT), () => console.log(`Listening on port ${PORT}`));
