// File: backend/src/index.ts
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Force .env path load (guaranteed to work)
const envPath = path.resolve(__dirname, '../.env');
console.log('Looking for .env at:', envPath);
console.log('File exists?', fs.existsSync(envPath));

dotenv.config({ path: envPath }); // Force load

console.log("MONGO_URI from .env:", process.env.MONGODB_URI); // Debug

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('School backend is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
