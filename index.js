require('dotenv').config()
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const { connectDB } = require('./src/lib/db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
    res.send('Welcome to Mamasecure API!');
});

app.use('/auth', authRoutes);

connectDB()
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });
