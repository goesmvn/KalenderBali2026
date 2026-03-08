import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    await page.goto('http://localhost:5175');
    await page.waitForLoadState('networkidle');

    // Open the language switcher (button with Globe icon)
    await page.click('button:has(svg.lucide-globe)');
    await page.waitForSelector('button:has-text("中文")', { state: 'visible' });

    // Switch to Chinese
    await page.click('button:has-text("中文")');
    await page.waitForTimeout(1000); // UI transition wait

    // Take screenshot
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/chinese_i18n.png', fullPage: true });

    await browser.close();
})();
