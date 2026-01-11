import mongoose from "mongoose";
import './product'
import { IProduct } from "./product";

interface IOrder {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: mongoose.Schema.Types.ObjectId[];
}

const orderSchema = new mongoose.Schema<IOrder>({
  payment: {
    type: String,
    enum: ['card', 'online'],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  items: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
    required: true,
    validate: {
      validator: async function (items: mongoose.Schema.Types.ObjectId[]) {
        if (items.length === 0) return false;
        const products = await mongoose.model('product').find({ _id: { $in: items } });
        if (products.length !== items.length) return false;
        return products.every(product => product.price !== null);
      },
      message: "Ошибка валидации данных при создании товара",
    }
  },
  total: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: async function (this: IOrder,total: number) {
        const products = await mongoose.model('product').find({ _id: { $in: this.items } });
        const sum = products.reduce((acc: number, product: IProduct) => acc + (product.price || 0), 0);
        return sum === total;
      },
      message: "Ошибка валидации данных при создании товара",
    }
  }
});

export default mongoose.model<IOrder>('order', orderSchema);