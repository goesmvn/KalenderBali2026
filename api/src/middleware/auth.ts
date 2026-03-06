import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kalenderbali-secret-key-change-in-production';

export interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

export function generateToken(payload: { id: number; username: string; role: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: number; username: string; role: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as any;
    } catch {
        return null;
    }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token diperlukan' });
        return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(401).json({ error: 'Token tidak valid atau sudah expired' });
        return;
    }

    req.user = decoded;
    next();
}
