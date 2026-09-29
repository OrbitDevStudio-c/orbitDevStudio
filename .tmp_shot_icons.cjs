const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1.5 });
  const logs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') logs.push(msg.text()); });
  page.on('pageerror', (err) => logs.push('pageerror: ' + err.message));

  await page.goto('http://localhost:5199/tech', { waitUntil: 'load', timeout: 20000 });
  await page.waitForTimeout(1000);

  const hero = page.locator('section').filter({ hasText: 'Practical tech stacks' }).first();
  await hero.screenshot({ path: '.tmp_icons_hero-dark.png', animations: 'disabled', timeout: 30000 });

  const whyUs = page.locator('section').filter({ hasText: 'senior expertise meets delivery precision' }).first();
  await whyUs.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await whyUs.screenshot({ path: '.tmp_icons_whyus-dark.png', animations: 'disabled', timeout: 30000 });

  const delivery = page.locator('section').filter({ hasText: 'Tailored technology solutions' }).first();
  await delivery.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await delivery.screenshot({ path: '.tmp_icons_delivery-dark.png', animations: 'disabled', timeout: 30000 });

  await page.click('button[aria-label*="Switch to"]');
  await page.waitForTimeout(400);
  await hero.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await hero.screenshot({ path: '.tmp_icons_hero-light.png', animations: 'disabled', timeout: 30000 });
  await whyUs.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await whyUs.screenshot({ path: '.tmp_icons_whyus-light.png', animations: 'disabled', timeout: 30000 });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log('overflow=', overflow, 'consoleErrors=', logs);

  await browser.close();
})();
