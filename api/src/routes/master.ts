import { Router, Request, Response } from 'express';
import { db } from '../db/connection.js';
import { dewasaAyu, wewaran, wuku, sasih, nyepiDates, pewatekan, bantenPenebusan, rahinan, settings } from '../db/schema.js';
import { eq, like } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// ============ GENERIC CRUD FACTORY ============
function createCrudRoutes(table: any, name: string) {
    const sub = Router();

    sub.get('/', (req: Request, res: Response) => {
        const results = db.select().from(table).all();
        res.json(results);
    });

    sub.get('/:id', (req: Request, res: Response) => {
        const item = db.select().from(table).where(eq(table.id, parseInt(req.params.id))).get();
        if (!item) { res.status(404).json({ error: `${name} tidak ditemukan` }); return; }
        res.json(item);
    });

    sub.post('/', (req: Request, res: Response) => {
        try {
            const result = db.insert(table).values(req.body).returning().get();
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    sub.put('/:id', (req: Request, res: Response) => {
        try {
            const result = db.update(table).set(req.body).where(eq(table.id, parseInt(req.params.id))).returning().get();
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    sub.delete('/:id', (req: Request, res: Response) => {
        db.delete(table).where(eq(table.id, parseInt(req.params.id))).run();
        res.json({ message: `${name} berhasil dihapus` });
    });

    return sub;
}

// Mount all master data routes
router.use('/dewasa-ayu', createCrudRoutes(dewasaAyu, 'Dewasa Ayu'));
router.use('/wewaran', createCrudRoutes(wewaran, 'Wewaran'));
router.use('/wuku', createCrudRoutes(wuku, 'Wuku'));
router.use('/sasih', createCrudRoutes(sasih, 'Sasih'));
router.use('/nyepi', createCrudRoutes(nyepiDates, 'Nyepi'));
router.use('/pewatekan', createCrudRoutes(pewatekan, 'Pewatekan'));
router.use('/banten', createCrudRoutes(bantenPenebusan, 'Banten'));
router.use('/rahinan', createCrudRoutes(rahinan, 'Rahinan'));
router.use('/settings', createCrudRoutes(settings, 'Setting'));

// Special: dashboard stats
router.get('/stats', (req: Request, res: Response) => {
    const stats = {
        dewasaAyu: db.select().from(dewasaAyu).all().length,
        wewaran: db.select().from(wewaran).all().length,
        wuku: db.select().from(wuku).all().length,
        sasih: db.select().from(sasih).all().length,
        pewatekan: db.select().from(pewatekan).all().length,
        banten: db.select().from(bantenPenebusan).all().length,
        rahinan: db.select().from(rahinan).all().length,
        settings: db.select().from(settings).all().length,
    };
    res.json(stats);
});

export default router;
