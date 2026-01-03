
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbs = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8');

const roles = [
  "web-designer", 
  "shopify-developer", 
  "copywriter", 
  "seo-specialist", 
  "virtual-assistant", 
  "ui-ux-designer", 
  "frontend-developer", 
  "fullstack-developer", 
  "social-media-manager", 
  "video-editor"
];

const routesToPrerender = [
  '/',
  '/hourly-rate-calculator/',
  '/project-quote-calculator/',
  '/retainer-calculator/',
  '/platform-fee-calculator/',
  '/tax-take-home-estimator/',
  '/guides/how-to-set-freelance-rates/',
  '/guides/billable-hours-utilization/',
  '/privacy/',
  '/terms/',
  '/about/',
  '/contact/',
  '/cookie-policy/',
  '/disclaimer/',
  ...roles.map(r => `/hourly-rate-calculator/${r}/`),
  ...roles.map(r => `/project-quote-calculator/${r}/`)
];

(async () => {
  console.log('--- Starting Pre-render for SEO ---');

  for (const url of routesToPrerender) {
    const fileName = url === '/' ? 'index.html' : `${url}index.html`.replace(/^\//, '');
    const fullPath = toAbs(`dist/${fileName}`);
    
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(fullPath, template);
    console.log('Pre-rendered:', url);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routesToPrerender.map(r => `
  <url>
    <loc>https://freelancercalculator.com${r}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r === '/' ? '1.0' : (r.includes('calculator') ? '0.9' : '0.7')}</priority>
  </url>`).join('')}
</urlset>`;
  fs.writeFileSync(toAbs('dist/sitemap.xml'), sitemap);
  
  const robots = `User-agent: *
Allow: /
Sitemap: https://freelancercalculator.com/sitemap.xml`;
  fs.writeFileSync(toAbs('dist/robots.txt'), robots);

  console.log('--- Pre-render Complete ---');
})();
