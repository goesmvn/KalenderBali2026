import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    await page.goto('http://localhost:5177');
    await page.waitForLoadState('networkidle');

    await page.click('button:has-text("ID")');
    await page.click('button:has-text("ID")');
    await page.click('button:has-text("Fitur & Layanan")');
    await page.click('button:has-text("Direktori Pura")');

    await page.waitForTimeout(2000);
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/pura_directory_id.png', fullPage: true });

    await browser.close();
})();
