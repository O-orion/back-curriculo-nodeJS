const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não fornecido!' })

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userdId = decoded.id;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Token Inválido' })
    }

}

module.exports = authMiddleware;
