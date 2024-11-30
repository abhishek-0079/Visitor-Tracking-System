import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI,)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log('Error:', error);
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});