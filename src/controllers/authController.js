const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios'})
        }

        const existingUser = await User.findByEmail(email);

        if (existingUser) return res.status(400).json({ error: 'Verifique se seu email já não foi cadastrado!'});

        const user = await User.create(email, password);
        res.status(201).json({ message: 'Usuário Criado', user: {user} })

    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

        const user = await User.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais Inválidas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token })

    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
};

module.exports = { register, login };
