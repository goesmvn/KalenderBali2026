import { Router, Request, Response } from 'express';
import { db } from '../db/connection.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username dan password diperlukan' });
            return;
        }

        const user = db.select().from(users).where(eq(users.username, username)).get();
        if (!user) {
            res.status(401).json({ error: 'Username atau password salah' });
            return;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            res.status(401).json({ error: 'Username atau password salah' });
            return;
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role });
        res.json({
            token,
            user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
});

// POST /api/auth/change-password
router.post('/change-password', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({ error: 'Password lama dan baru diperlukan' });
            return;
        }

        const user = db.select().from(users).where(eq(users.id, req.user!.id)).get();
        if (!user) {
            res.status(404).json({ error: 'User tidak ditemukan' });
            return;
        }

        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
            res.status(401).json({ error: 'Password lama salah' });
            return;
        }

        const newHash = await bcrypt.hash(newPassword, 12);
        db.update(users).set({ passwordHash: newHash }).where(eq(users.id, req.user!.id)).run();
        res.json({ message: 'Password berhasil diubah' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
