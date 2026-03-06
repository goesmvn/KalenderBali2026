import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/auth.js';
import puraRoutes from './routes/pura.js';
import ceremoniesRoutes from './routes/ceremonies.js';
import masterRoutes from './routes/master.js';

const app = express();
const PORT = parseInt(process.env.PORT || '8080');

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disabled for React SPA dynamic inline scripts/images
    crossOriginEmbedderPolicy: false, // Allow external resources if any
}));

// Rate Limiter for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Terlalu banyak request, percobaaan ditangguhkan sementara. Silakan coba 15 menit lagi.' }
});

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Apply rate limiting to all /api routes
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pura', puraRoutes);
app.use('/api/ceremonies', ceremoniesRoutes);
app.use('/api/master', masterRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start
app.listen(PORT, () => {
    console.log(`🛕 KalenderBali API running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
});

// Serve frontend SPA properly with Social Media SEO Tag Injector
const distPath = path.resolve(__dirname, '../../app/dist');

// Serve static assets without index.html
app.use(express.static(distPath, { index: false }));

// Wildcard handler to inject open-graph tags
app.get(/^(.*)$/, (req, res, next) => {
    // Ignore API routes just in case
    if (req.path.startsWith('/api')) {
        return next();
    }
    const filePath = path.join(distPath, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Error loading page. Please make sure the app is built.');
        }

        const dateQuery = req.query.date;
        let title = 'Kalender Bali Digital - Dewasa Ayu & Piodalan';
        let desc = 'Cari informasi Kalender Bali, Dewasa Ayu (Hari Baik), Piodalan, Wewaran, dan perayaan raya secara cepat, akurat, dan tanpa iklan.';
        let url = 'https://kalenderbali.id';

        if (typeof dateQuery === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateQuery)) {
            const parts = dateQuery.split('-');
            const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            if (!isNaN(d.getTime())) {
                const dateStr = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                title = `Kalender Bali: ${dateStr}`;
                desc = `Lihat ramalan, dewasa ayu (hari baik), wewaran, dan piodalan untuk tanggal ${dateStr} di Kalender Bali Digital.`;
                url = `https://kalenderbali.id/?date=${dateQuery}`;
            }
        }

        const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
        `;

        // Inject the generated SEO tags into the placeholder.
        // Vite minifier will change the quotes or remove spaces, so using regex to be safe.
        let injectedHtml = data.replace(/<meta[^>]*name="kalender-id-seo-placeholder"[^>]*>/i, metaTags);

        // Also replace the default static <title>
        injectedHtml = injectedHtml.replace(/<title>.*?<\/title>/i, '');

        res.send(injectedHtml);
    });
});

export default app;
