import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Go to local dev server
  await page.goto('http://localhost:5177');

  // Wait for network idle
  await page.waitForLoadState('networkidle');

  // Explicitly switch to ID first
  try {
    const isEnActive = await page.isVisible('button:has-text("EN")');
    if (isEnActive) {
      await page.click('button:has-text("EN")');
      await page.click('button:has-text("ID")');
      await page.waitForTimeout(500);
    }
  } catch (e) { }

  // Take a full page screenshot of the Home/Header
  await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/final_homepage_id.png', fullPage: true });

  // Open Nyepi Guide
  await page.click('button:has-text("Fitur & Layanan")');
  await page.click('button:has-text("Nyepi Guide")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/final_nyepi_id.png' });
  await page.click('button:has(svg.w-6.h-6)'); // Close Nyepi Guide

  // Switch to English
  await page.click('button:has-text("ID")');
  await page.click('button:has-text("EN")');
  await page.waitForTimeout(500);

  // Take screenshot 
  await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/final_homepage_en.png', fullPage: true });

  // Open Nyepi Guide in EN
  await page.click('button:has-text("Features & Services")');
  await page.click('button:has-text("Nyepi Guide")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/final_nyepi_en.png' });

  // Switch to JA
  await page.click('button:has-text("EN")');
  await page.click('button:has-text("JA")');
  await page.waitForTimeout(500);

  // Take screenshot 
  await page.screenshot({ path: '../brain/a623135a-849e-4a97-a0be-3f826a8855d4/final_homepage_ja.png', fullPage: true });

  await browser.close();
})();
