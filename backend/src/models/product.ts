import mongoose from 'mongoose';

export interface IProduct {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description: string;
  price: number | null;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model<IProduct>('product', productSchema);
