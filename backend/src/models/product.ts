import mongoose from "mongoose";

export interface IProduct {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description: string;
  price: number | null; 
};

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type:String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
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
  }
});

export default mongoose.model<IProduct>('product', productSchema);