#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src');
const IGNORED = ['node_modules', 'dist', '.git'];
const allowedFetchFile = path.join('src', 'services', 'api.js').replace(/\\/g, '/');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!IGNORED.includes(file)) results = results.concat(walk(filePath));
    } else {
      if (/\.(js|jsx|ts|tsx)$/.test(file)) results.push(filePath);
    }
  });
  return results;
}

function relative(p) { return path.relative(path.join(__dirname, '..'), p).replace(/\\/g, '/'); }

const files = walk(ROOT);
let errors = [];

files.forEach((f) => {
  const rel = relative(f);
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((ln, idx) => {
    if (/\bfetch\s*\(/.test(ln) || /\baxios\s*\(/.test(ln) || ln.includes('XMLHttpRequest')) {
      // allow fetch in services/api.js
      if (rel.endsWith(allowedFetchFile)) return;
      errors.push(`${rel}:${idx+1}: ${ln.trim()}`);
    }
  });
});

if (errors.length) {
  console.error('audit-network: Found disallowed network calls:');
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
}

console.log('audit-network: OK — no disallowed network calls found.');
process.exit(0);
