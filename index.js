import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Habilita que pueda leer y procesar la información de tipo JSON
app.use(express.json());

dotenv.config();

connectDB();

app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// Routing
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})