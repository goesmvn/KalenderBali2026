import { Router, Request, Response } from 'express';
import { db } from '../db/connection.js';
import { pura } from '../db/schema.js';
import { eq, like, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/pura — List all pura
router.get('/', (req: Request, res: Response) => {
    const { search, kategori } = req.query;
    let query = db.select().from(pura);

    if (search) {
        query = query.where(like(pura.nama, `%${search}%`)) as any;
    }

    const results = query.orderBy(pura.nama).all();
    res.json(results);
});

// GET /api/pura/:id
router.get('/:id', (req: Request, res: Response) => {
    const item = db.select().from(pura).where(eq(pura.id, parseInt(req.params.id as string))).get();
    if (!item) { res.status(404).json({ error: 'Pura tidak ditemukan' }); return; }
    res.json(item);
});

// POST /api/pura
router.post('/', authMiddleware, (req: Request, res: Response) => {
    try {
        const result = db.insert(pura).values(req.body).returning().get();
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/pura/:id
router.put('/:id', authMiddleware, (req: Request, res: Response) => {
    try {
        const result = db.update(pura)
            .set({ ...req.body, updatedAt: new Date().toISOString() })
            .where(eq(pura.id, parseInt(req.params.id as string)))
            .returning().get();
        if (!result) { res.status(404).json({ error: 'Pura tidak ditemukan' }); return; }
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/pura/:id
router.delete('/:id', authMiddleware, (req: Request, res: Response) => {
    db.delete(pura).where(eq(pura.id, parseInt(req.params.id as string))).run();
    res.json({ message: 'Pura berhasil dihapus' });
});

export default router;
