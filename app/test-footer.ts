import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    await page.goto('http://localhost:5175');
    await page.waitForLoadState('networkidle');

    // Change language to Chinese
    await page.click('button:has(svg.lucide-globe)');
    await page.waitForSelector('button:has-text("中文")');
    await page.click('button:has-text("中文")');
    await page.waitForTimeout(1000); // UI transition wait

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Take screenshot of footer view
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/footer_translated.png' });

    // Navigate to Privacy Policy
    await page.click('button:has-text("隐私政策")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/privacy_translated.png' });

    // Navigate to Terms of Service
    await page.click('button:text("服务条款")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/terms_translated.png' });

    await browser.close();
})();
