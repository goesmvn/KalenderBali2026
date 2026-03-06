import { Router, Request, Response } from 'express';
import { db } from '../db/connection.js';
import { ceremonyTypes, ceremonyRules, ruleConditions } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// ============ CEREMONY TYPES ============

// GET /api/ceremonies — List all ceremony types
router.get('/', (req: Request, res: Response) => {
    const results = db.select().from(ceremonyTypes).orderBy(ceremonyTypes.sortOrder).all();
    res.json(results);
});

// GET /api/ceremonies/:id — Get ceremony with rules and conditions
router.get('/:id', (req: Request, res: Response) => {
    const ceremony = db.select().from(ceremonyTypes).where(eq(ceremonyTypes.id, parseInt(req.params.id))).get();
    if (!ceremony) { res.status(404).json({ error: 'Upacara tidak ditemukan' }); return; }

    const rules = db.select().from(ceremonyRules)
        .where(eq(ceremonyRules.ceremonyId, ceremony.id))
        .orderBy(ceremonyRules.sortOrder)
        .all();

    const rulesWithConditions = rules.map(rule => {
        const conditions = db.select().from(ruleConditions)
            .where(eq(ruleConditions.ruleId, rule.id))
            .all();
        return { ...rule, conditions };
    });

    res.json({ ...ceremony, rules: rulesWithConditions });
});

// POST /api/ceremonies
router.post('/', (req: Request, res: Response) => {
    try {
        const result = db.insert(ceremonyTypes).values(req.body).returning().get();
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/ceremonies/:id
router.put('/:id', (req: Request, res: Response) => {
    try {
        const result = db.update(ceremonyTypes)
            .set(req.body)
            .where(eq(ceremonyTypes.id, parseInt(req.params.id)))
            .returning().get();
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/ceremonies/:id
router.delete('/:id', (req: Request, res: Response) => {
    db.delete(ceremonyTypes).where(eq(ceremonyTypes.id, parseInt(req.params.id))).run();
    res.json({ message: 'Upacara berhasil dihapus' });
});

// ============ CEREMONY RULES ============

// POST /api/ceremonies/:id/rules
router.post('/:id/rules', (req: Request, res: Response) => {
    try {
        const result = db.insert(ceremonyRules)
            .values({ ...req.body, ceremonyId: parseInt(req.params.id) })
            .returning().get();
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/ceremonies/rules/:ruleId
router.put('/rules/:ruleId', (req: Request, res: Response) => {
    try {
        const result = db.update(ceremonyRules)
            .set(req.body)
            .where(eq(ceremonyRules.id, parseInt(req.params.ruleId)))
            .returning().get();
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/ceremonies/rules/:ruleId
router.delete('/rules/:ruleId', (req: Request, res: Response) => {
    db.delete(ceremonyRules).where(eq(ceremonyRules.id, parseInt(req.params.ruleId))).run();
    res.json({ message: 'Rule berhasil dihapus' });
});

// ============ RULE CONDITIONS ============

// POST /api/ceremonies/rules/:ruleId/conditions
router.post('/rules/:ruleId/conditions', (req: Request, res: Response) => {
    try {
        const result = db.insert(ruleConditions)
            .values({ ...req.body, ruleId: parseInt(req.params.ruleId) })
            .returning().get();
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/ceremonies/conditions/:conditionId
router.delete('/conditions/:conditionId', (req: Request, res: Response) => {
    db.delete(ruleConditions).where(eq(ruleConditions.id, parseInt(req.params.conditionId))).run();
    res.json({ message: 'Condition berhasil dihapus' });
});

export default router;
