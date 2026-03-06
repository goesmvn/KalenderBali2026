import { webkit } from 'playwright';

(async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    try {
        const response = await page.goto('http://localhost:5173/?date=2026-03-06', { waitUntil: 'load' });
        console.log('Main HTML Status:', response?.status());
    } catch (e) {
        console.log('Navigation fault:', e);
    }

    // wait a bit for react to mount and potentially crash
    await new Promise(r => setTimeout(r, 3000));
    await browser.close();
})();
