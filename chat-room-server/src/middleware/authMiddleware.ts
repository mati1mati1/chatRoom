// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export { authMiddleware };
