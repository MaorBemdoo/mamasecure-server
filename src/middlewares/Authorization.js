const { verifyToken } = require('../lib/auth');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    verifyToken(token)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            return res.status(403).json({ error: 'Invalid token' });
        });
}

module.exports = authMiddleware;
