const express = require('express');
const cors = require(cors);
require('dotenv').config();

const db = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const curriculumRoutes = require('./routes/curriculumRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/curriculums', curriculumRoutes);

app.get('/', (req, res) => {
    res.send('Back-End do Gerador de Currículos está on!')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})
