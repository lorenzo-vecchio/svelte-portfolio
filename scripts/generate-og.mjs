import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1200, height: 630 });
await page.goto('http://localhost:5173/og', { waitUntil: 'networkidle' });

// Extra wait to ensure fonts are fully painted
await page.waitForTimeout(500);

const element = page.locator('#og-image');
await element.screenshot({ path: 'static/og-image.png' });

await browser.close();
console.log('✓  OG image saved to static/og-image.png');
