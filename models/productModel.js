import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({

    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    tags: { type: [String], default: [] },
    brand: { type: String },
    sku: { type: String, unique: true },
    sizes: { type: [String], default: [] },
    images: { type: [String], default: [] }
},
    {
        timestamps: true
    }
);
const Product = mongoose.model("Product", productSchema);
export default Product;