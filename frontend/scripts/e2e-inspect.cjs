#!/usr/bin/env node
const { chromium } = require('playwright');

(async () => {
  const base = process.env.VITE_TEST_BASE || 'http://localhost:5178';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const logs = [];
  const requests = [];

  page.on('console', (msg) => {
    logs.push({ type: 'console', text: msg.text(), location: msg.location ? msg.location() : null });
  });

  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', text: String(err) });
  });

  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/api/raffles/') || url.includes('/api/cards') || url.includes('/cards/')) {
      requests.push({ method: req.method(), url });
    }
  });

  console.log('Visiting /sorteo/1 directly');
  await page.goto(base + '/sorteo/1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // capture DOM state for the grid area
  const gridInfo = await page.evaluate(() => {
    const title = document.querySelector('h2')?.innerText || '';
    const img = document.querySelector('img[alt^="Ilustración"]') || document.querySelector('.grid img');
    if (!img) return { foundImage: false };
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const elAtPoint = document.elementFromPoint(cx, cy);

    function path(el) {
      if (!el) return null;
      const parts = [];
      while (el && el.nodeType === 1 && el.tagName.toLowerCase() !== 'html') {
        let part = el.tagName.toLowerCase();
        if (el.id) part += `#${el.id}`;
        else if (el.className) part += `.${String(el.className).replace(/\s+/g, '.')}`;
        parts.unshift(part);
        el = el.parentElement;
      }
      return parts.join(' > ');
    }

    const blocker = elAtPoint ? {
      tag: elAtPoint.tagName,
      path: path(elAtPoint),
      style: window.getComputedStyle(elAtPoint) ? {
        position: window.getComputedStyle(elAtPoint).position,
        zIndex: window.getComputedStyle(elAtPoint).zIndex,
        pointerEvents: window.getComputedStyle(elAtPoint).pointerEvents,
        opacity: window.getComputedStyle(elAtPoint).opacity
      } : null
    } : null;

    // find overlay candidates (absolute inset-0 etc.)
    const overlays = Array.from(document.querySelectorAll('*')).filter(n => {
      const s = window.getComputedStyle(n);
      return (s.position === 'fixed' || s.position === 'absolute') && (s.pointerEvents !== 'none') && (n.offsetWidth >= window.innerWidth*0.95 || n.offsetHeight >= window.innerHeight*0.95);
    }).map(n => ({ path: path(n), position: window.getComputedStyle(n).position, zIndex: window.getComputedStyle(n).zIndex, pointerEvents: window.getComputedStyle(n).pointerEvents }));

    return { foundImage: true, rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height }, blocker, overlays, title };
  });

  console.log('Grid info:', JSON.stringify(gridInfo, null, 2));

  console.log('Now visiting /ilustraciones and clicking first card');
  await page.goto(base + '/ilustraciones', { waitUntil: 'networkidle' });
  try {
    await page.waitForSelector('a.block.group', { timeout: 3000 });
    const first = await page.$('a.block.group');

    // capture bounding box and elementFromPoint before click
    const before = await page.evaluate(() => {
      const el = document.querySelector('a.block.group');
      if (!el) return null;
      const img = el.querySelector('img');
      const r = img.getBoundingClientRect();
      return { href: el.getAttribute('href'), imgSrc: img && img.getAttribute('src'), rect: { left: r.left, top: r.top, width: r.width, height: r.height } };
    });

    // click and wait
    await first.click();
    await page.waitForLoadState('networkidle');

    const finalUrl = page.url();
    console.log('finalUrl after clicking first illustration:', finalUrl);

    // Print captured relevant requests and console logs
    console.log('Captured requests:', JSON.stringify(requests, null, 2));
    console.log('Captured console logs:', JSON.stringify(logs, null, 2));
    console.log('Before click element info:', JSON.stringify(before, null, 2));
  } catch (e) {
    console.error('No card to click on /ilustraciones:', e.message);
  }

  await browser.close();
})();
