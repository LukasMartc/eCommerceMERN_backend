import Product from '../models/Product.js';
import User from '../models/User.js';
import mongoose from "mongoose";
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra'

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.json({success: false, msg: error.message})
    }
}

const createProduct = async (req, res) => {
    const id = req.user._id.toString();
    const user = await User.findById(id);
    if(!user.admin) {
        const error = new Error('No estás autorizado para registrar productos');
        return res.status(400).json({ msg: error.message });
    }

    const { name } = req.body;
    const productExists = await Product.findOne({ name });
    if(productExists) {
        const error = new Error('Producto ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const { name, price, brand, features, color, others, inStock } = req.body;
        let image;

        if(req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newProduct = new Product({ name, price, brand, features, color, others, inStock, image });
        const storedNewProducto = await newProduct.save();
        res.json({
            success: true,
            message: "Producto creado con éxito",
            storedNewProducto
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message })
    }
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    const productExists = mongoose.Types.ObjectId.isValid(id);
    if(!productExists) {
        const error = new Error('No existe el producto');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {
        console.log(error)
    }
    
}

const editProduct = async (req, res) => {
    const idUser = req.user._id.toString();
    const user = await User.findById(idUser);
    if(!user.admin) {
        const error = new Error('No estás autorizado para editar productos');
        return res.status(400).json({ msg: error.message });
    }   

    const { id } = req.params;
    const productExists = mongoose.Types.ObjectId.isValid(id);
    if(!productExists) {
        const error = new Error('No existe el producto');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const currentProduct = await Product.findById(id);

        const data = {
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            features: req.body.features,
            color: req.body.color,
            others: req.body.others,
            inStock: req.body.inStock
        }

        if(req.files.image) {
            const imgId = currentProduct.image.public_id;
            if(imgId) {
                await deleteImage(imgId);
            }
            
            const newImg = await uploadImage(req.files.image.tempFilePath);

            await fs.remove(req.files.image.tempFilePath);
            
            data.image = {
                url: newImg.secure_url,
                public_id: newImg.public_id
            }
        }

        const product = await Product.findByIdAndUpdate(id, data, {new: true});
        res.json({ 
            success: true,
            msg: 'Producto editado con éxito',
            product
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    const _id = req.user._id.toString();
    const user = await User.findById(_id);
    if(!user.admin) {
        const error = new Error('No estás autorizado para eliminar productos');
        return res.status(400).json({ msg: error.message });
    }    

    const { id } = req.params;
    const productExists = mongoose.Types.ObjectId.isValid(id);
    if(!productExists) {
        const error = new Error('No existe el producto');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        if(product.image.public_id) {
            await deleteImage(product.image.public_id);      
        }

        res.json({ success: true, msg: 'Producto eliminado con éxito' });
    } catch (error) {
        console.log(error);
    }
}

export {
    getProducts,
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}