import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    await page.goto('http://localhost:5175');
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("Fitur & Layanan")');
    await page.waitForSelector('button:has-text("Smart Trip Planner")', { state: 'visible' });
    await page.click('button:has-text("Smart Trip Planner")');

    await page.waitForTimeout(2000); // UI transition wait
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/trip_planner_id.png', fullPage: true });

    await browser.close();
})();
