#!/usr/bin/env node
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const requests = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/api/raffles/undefined')) requests.push(url);
  });

  const base = process.env.VITE_TEST_BASE || 'http://localhost:5178';
  console.log('opening', base + '/ilustraciones');
  await page.goto(base + '/ilustraciones', { waitUntil: 'networkidle' });

  // wait for first card link
  try {
    await page.waitForSelector('a.block.group', { timeout: 5000 });
  } catch (e) {
    console.error('No card link found on /ilustraciones');
    await browser.close();
    process.exit(2);
  }

  const first = await page.$('a.block.group');
  if (!first) {
    console.error('No clickable card found');
    await browser.close();
    process.exit(2);
  }

  // click and wait
  await first.click();
  await page.waitForLoadState('networkidle');
  const finalUrl = page.url();

  console.log('finalUrl:', finalUrl);
  console.log('found undefined requests count:', requests.length);
  if (requests.length) console.log('requests:', requests);

  await browser.close();
  // exit 0 = success (no undefined requests), 1 = found undefined requests
  process.exit(requests.length ? 1 : 0);
})();
