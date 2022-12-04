import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String
        } 
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    features: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true  
    },
    others: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema);

export default Product;