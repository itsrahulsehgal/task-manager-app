import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Please authenticate with valid crendential" })
    }

    try {
        const data = jwt.verify(token, process.env.PRIVATE_TOKEN_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Please authenticate with valid crendential" })
    }
}

export {verifyToken}