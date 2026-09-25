---
description: Use Browser Run and Puppeteer to read a site's real computed styles, colors, fonts, and logo, then return a structured brand kit from a Worker.
title: Extract a brand kit from any website
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract a brand kit from any website

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/browser-run/how-to/extract-brand-kit/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A brand kit is the set of visual design decisions that make a website recognizable: its colors, typography, logo, and component styles. Extracting one automatically is useful for building design-system tooling, generating themed previews, seeding a coding agent with a site's look and feel, or auditing brand consistency across pages.

The reliable way to read these values is from a real browser. A site's exact hex colors, `font-family` names, border radii, and logo live in CSS and computed styles, not in the page's readable text. A large language model that only sees text will get the name and description right, but it will hallucinate the colors and fonts. With [Cloudflare Browser Run](https://developers.cloudflare.com/browser-run/) and [Cloudflare's fork of Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), you can load a page in managed headless Chrome and read the **real** computed styles, meta tags, and logo straight from the DOM.

Try it live

You can see the finished extractor in action at the [Browser Run demo ↗](https://what-can-browser-run-do.examples.workers.dev/brand). Enter any URL to view the brand kit it pulls from the live page.

In this tutorial, you will:

- Add a Browser Run binding and Puppeteer to a Worker
- Run an in-page script that reads computed styles, fonts, and the logo
- Score and dedupe colors to find the brand's palette
- Return the brand kit as JSON
- Cache results in Workers KV so repeat lookups are instant

## Prerequisites

To follow this tutorial, you need:

- A Cloudflare account with [Browser Run enabled](https://developers.cloudflare.com/browser-run/get-started/)
- Node.js and npm installed locally
- Basic familiarity with TypeScript and Cloudflare Workers

## 1. Create a Worker project

Create a new Worker project named `brand-kit`:

npmyarnpnpm

```
npm create cloudflare@latest -- brand-kit
```

```
yarn create cloudflare brand-kit
```

```
pnpm create cloudflare@latest brand-kit
```

When prompted, choose a **Hello World** Worker using **TypeScript**.

## 2. Install Puppeteer

In your `brand-kit` directory, install Cloudflare's fork of Puppeteer:

npmyarnpnpmbun

```
npm i -D @cloudflare/puppeteer
```

```
yarn add -D @cloudflare/puppeteer
```

```
pnpm add -D @cloudflare/puppeteer
```

```
bun add -d @cloudflare/puppeteer
```

## 3. Create a KV namespace

Extracting a brand kit drives a full browser session, so you want to cache the result and avoid re-running the browser for repeat lookups of the same URL. Create a [KV](https://developers.cloudflare.com/kv/) namespace for the cache:

npmyarnpnpm

```
npx wrangler kv namespace create CACHE
```

```
yarn wrangler kv namespace create CACHE
```

```
pnpm wrangler kv namespace create CACHE
```

Copy the namespace `id` from the command output. You will add it to your Wrangler configuration in the next step.

## 4. Configure Browser Run

Add a Browser Run binding, the KV namespace, and the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag) (required by Puppeteer) to your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "brand-kit",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-09-25",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "browser": {
    "binding": "BROWSER"
  },
  "kv_namespaces": [
    {
      "binding": "CACHE",
      "id": "<YOUR_KV_NAMESPACE_ID>"
    }
  ]
}
```

```toml
name = "brand-kit"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-09-25"
compatibility_flags = ["nodejs_compat"]

# Browser Run binding — driven by Puppeteer.
[browser]
binding = "BROWSER"

# KV cache for extracted brand kits.
[[kv_namespaces]]
binding = "CACHE"
id = "<YOUR_KV_NAMESPACE_ID>"
```

Note

Puppeteer requires the `nodejs_compat` compatibility flag and a `compatibility_date` of `2025-09-15` or later.

## 5. Write the in-page extraction script

The core of the extractor is a script that runs **inside the page** through `page.evaluate()`. It reads computed styles, meta tags, and the logo, then returns the brand kit as a JSON string. Returning a primitive string (rather than a live object) makes serialization across the browser boundary reliable.

This script must be self-contained: it cannot reference anything from the Worker's scope. It does three things:

- Reads `<meta>` tags for the name and description.
- Walks the DOM once, sampling `background-color`, `color`, and `border-color` from every element. It skips greys and near-white/near-black colors (low saturation), weighs backgrounds and brand or call-to-action elements more heavily, then dedupes the top colors by color distance to produce a palette.
- Reads the `font-family` from a heading, the body, and a code block, and picks a logo (inline SVG, `<img>`, declared icon, or Open Graph image, in that order).

Create `src/extract.ts`:

```js
// This runs in the page (headless Chrome). It must be self-contained and
// return a JSON string, which page.evaluate() serializes reliably.
export const BRAND_SCRIPT = `
(() => {
  var origin = location.href;
  var abs = function (u) { try { return new URL(u, origin).href; } catch (e) { return u; } };
  var getMetaContent = function (sel) { var m = document.querySelector(sel); return m && m.content ? m.content.trim() : null; };

  function parseColor(str) {
    if (!str) return null;
    var m = str.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    var p = m[1].split(',').map(function (x) { return parseFloat(x.trim()); });
    var a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return { r: p[0], g: p[1], b: p[2] };
  }
  function toHex(c) {
    var h = function (n) { var s = Math.max(0, Math.min(255, Math.round(n))).toString(16); return s.length < 2 ? '0' + s : s; };
    return ('#' + h(c.r) + h(c.g) + h(c.b)).toUpperCase();
  }
  function saturation(c) {
    var r = c.r / 255, g = c.g / 255, b = c.b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (d === 0) return 0;
    var l = (max + min) / 2;
    return l > 0.5 ? d / (2 - max - min) : d / (max + min);
  }
  function lightness(c) {
    var max = Math.max(c.r, c.g, c.b) / 255, min = Math.min(c.r, c.g, c.b) / 255;
    return (max + min) / 2;
  }
  function dist(a, b) {
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
  }
  function cleanFont(ff) {
    if (!ff) return null;
    var generic = ['sans-serif', 'serif', 'monospace', 'system-ui', '-apple-system', 'ui-sans-serif', 'ui-monospace', 'blinkmacsystemfont', 'segoe ui', 'roboto', 'helvetica neue', 'arial'];
    var parts = ff.split(',').map(function (x) { return x.trim().replace(/^["']|["']$/g, ''); });
    for (var k = 0; k < parts.length; k++) { if (parts[k] && generic.indexOf(parts[k].toLowerCase()) < 0) return parts[k]; }
    return parts[0] || null;
  }

  // ---- colors: a single pass over the DOM, scoring brand colors ----
  var scored = {};
  function add(c, weight) {
    var hex = toHex(c);
    if (!scored[hex]) scored[hex] = { score: 0, c: c };
    scored[hex].score += weight;
  }

  // theme-color is an explicit brand signal — weigh it heavily.
  var themeColor = getMetaContent('meta[name="theme-color"]');
  if (themeColor) { var d = document.createElement('div'); d.style.color = themeColor; document.body.appendChild(d); var tc = parseColor(getComputedStyle(d).color); d.remove(); if (tc) add(tc, 1000); }

  var all = document.querySelectorAll('body *');
  var limit = Math.min(all.length, 4000);
  for (var i = 0; i < limit; i++) {
    var el = all[i];
    var cs = getComputedStyle(el);
    var tag = el.tagName.toLowerCase();
    var cls = (el.className && el.className.toString ? el.className.toString() : '').toLowerCase();
    // Buttons, links, and brand/CTA/nav elements are stronger brand signals.
    var emphasis = (tag === 'button' || tag === 'a' || /btn|cta|button|brand|logo|nav|header|primary|hero/.test(cls)) ? 3 : 1;
    var props = [cs.backgroundColor, cs.color, cs.borderColor];
    for (var j = 0; j < props.length; j++) {
      var col = parseColor(props[j]);
      if (!col) continue;
      if (saturation(col) < 0.2) continue;          // skip greys / near-white / near-black
      var lt = lightness(col);
      if (lt < 0.07 || lt > 0.95) continue;
      add(col, (j === 0 ? 2 : 1) * emphasis);        // backgrounds weigh more than text
    }
  }

  var entries = Object.keys(scored).map(function (h) { return { hex: h, score: scored[h].score, c: scored[h].c }; });
  entries.sort(function (a, b) { return b.score - a.score; });
  var picked = [];
  for (var e = 0; e < entries.length && picked.length < 5; e++) {
    var ok = true;
    for (var p = 0; p < picked.length; p++) { if (dist(entries[e].c, picked[p].c) < 40) { ok = false; break; } }
    if (ok) picked.push(entries[e]);
  }
  var roles = ['primary', 'secondary', 'accent', 'color-4', 'color-5'];
  var colors = picked.map(function (c, idx) { return { name: roles[idx], hex: c.hex }; });

  // ---- color scheme ----
  var bgEl = parseColor(getComputedStyle(document.body).backgroundColor);
  var colorScheme = (bgEl && lightness(bgEl) < 0.45) ? 'dark' : 'light';

  // ---- fonts: headings, body, mono ----
  var headingEl = document.querySelector('h1, h2, h3');
  var headingFont = headingEl ? cleanFont(getComputedStyle(headingEl).fontFamily) : null;
  var bodyFont = cleanFont(getComputedStyle(document.body).fontFamily);
  var monoEl = document.querySelector('code, pre, kbd');
  var monoFont = monoEl ? cleanFont(getComputedStyle(monoEl).fontFamily) : null;
  var fonts = [];
  if (headingFont) fonts.push({ name: headingFont, usage: 'headings' });
  if (bodyFont && bodyFont.toLowerCase() !== (headingFont || '').toLowerCase()) fonts.push({ name: bodyFont, usage: 'body' });
  if (monoFont && monoFont.toLowerCase() !== (bodyFont || '').toLowerCase()) fonts.push({ name: monoFont, usage: 'mono' });

  // ---- logo: inline SVG (as a data URI) → <img> logo → declared icon → Open Graph image ----
  function serializeSvg(svg) {
    try {
      var clone = svg.cloneNode(true);
      if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      var str = new XMLSerializer().serializeToString(clone);
      if (str.length > 30000) return null;
      return 'data:image/svg+xml,' + encodeURIComponent(str);
    } catch (e) { return null; }
  }
  function pickLogo() {
    var svgSels = ['a[href="/"] svg', '[class*="logo" i] svg', 'header svg', 'nav svg'];
    for (var s = 0; s < svgSels.length; s++) {
      var svg = document.querySelector(svgSels[s]);
      if (svg) { var rc = svg.getBoundingClientRect(); if (rc.width >= 16 && rc.width <= 640 && rc.height >= 8) { var data = serializeSvg(svg); if (data) return data; } }
    }
    var imgSels = ['[class*="logo" i] img', 'img[alt*="logo" i]', 'header a[href="/"] img', 'header img'];
    for (var i2 = 0; i2 < imgSels.length; i2++) {
      var img = document.querySelector(imgSels[i2]);
      // Guard against a full-width banner image matching a "logo" selector by
      // rejecting anything outside a plausible logo size, the same way the
      // SVG branch above does with getBoundingClientRect().
      if (img && img.naturalWidth >= 16 && img.naturalWidth <= 640 && img.naturalHeight >= 8) {
        var src = img.currentSrc || img.getAttribute('src');
        if (src) return abs(src);
      }
    }
    var icon = document.querySelector('link[rel="apple-touch-icon"], link[rel~="icon"]');
    if (icon && icon.href) return abs(icon.href);
    var ogImage = getMetaContent('meta[property="og:image"]');
    if (ogImage) return abs(ogImage);
    return '';
  }

  var name = getMetaContent('meta[property="og:site_name"]') ||
    (document.title ? document.title.split(/[-|–—·•:]/)[0].trim() : '') ||
    location.hostname.replace(/^www\\./, '');
  var description = getMetaContent('meta[name="description"]') || getMetaContent('meta[property="og:description"]') || '';

  return JSON.stringify({
    name: name,
    description: description,
    logoUrl: pickLogo(),
    colorScheme: colorScheme,
    colors: colors,
    fonts: fonts
  });
})();
`;
```

```ts
export type BrandColor = { name: string; hex: string };
export type BrandFont = { name: string; usage: string };

export type BrandKit = {
	name: string;
	description: string;
	logoUrl: string;
	colorScheme: "light" | "dark";
	colors: BrandColor[];
	fonts: BrandFont[];
};

// This runs in the page (headless Chrome). It must be self-contained and
// return a JSON string, which page.evaluate() serializes reliably.
export const BRAND_SCRIPT = `
(() => {
  var origin = location.href;
  var abs = function (u) { try { return new URL(u, origin).href; } catch (e) { return u; } };
  var getMetaContent = function (sel) { var m = document.querySelector(sel); return m && m.content ? m.content.trim() : null; };

  function parseColor(str) {
    if (!str) return null;
    var m = str.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    var p = m[1].split(',').map(function (x) { return parseFloat(x.trim()); });
    var a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return { r: p[0], g: p[1], b: p[2] };
  }
  function toHex(c) {
    var h = function (n) { var s = Math.max(0, Math.min(255, Math.round(n))).toString(16); return s.length < 2 ? '0' + s : s; };
    return ('#' + h(c.r) + h(c.g) + h(c.b)).toUpperCase();
  }
  function saturation(c) {
    var r = c.r / 255, g = c.g / 255, b = c.b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (d === 0) return 0;
    var l = (max + min) / 2;
    return l > 0.5 ? d / (2 - max - min) : d / (max + min);
  }
  function lightness(c) {
    var max = Math.max(c.r, c.g, c.b) / 255, min = Math.min(c.r, c.g, c.b) / 255;
    return (max + min) / 2;
  }
  function dist(a, b) {
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
  }
  function cleanFont(ff) {
    if (!ff) return null;
    var generic = ['sans-serif', 'serif', 'monospace', 'system-ui', '-apple-system', 'ui-sans-serif', 'ui-monospace', 'blinkmacsystemfont', 'segoe ui', 'roboto', 'helvetica neue', 'arial'];
    var parts = ff.split(',').map(function (x) { return x.trim().replace(/^["']|["']$/g, ''); });
    for (var k = 0; k < parts.length; k++) { if (parts[k] && generic.indexOf(parts[k].toLowerCase()) < 0) return parts[k]; }
    return parts[0] || null;
  }

  // ---- colors: a single pass over the DOM, scoring brand colors ----
  var scored = {};
  function add(c, weight) {
    var hex = toHex(c);
    if (!scored[hex]) scored[hex] = { score: 0, c: c };
    scored[hex].score += weight;
  }

  // theme-color is an explicit brand signal — weigh it heavily.
  var themeColor = getMetaContent('meta[name="theme-color"]');
  if (themeColor) { var d = document.createElement('div'); d.style.color = themeColor; document.body.appendChild(d); var tc = parseColor(getComputedStyle(d).color); d.remove(); if (tc) add(tc, 1000); }

  var all = document.querySelectorAll('body *');
  var limit = Math.min(all.length, 4000);
  for (var i = 0; i < limit; i++) {
    var el = all[i];
    var cs = getComputedStyle(el);
    var tag = el.tagName.toLowerCase();
    var cls = (el.className && el.className.toString ? el.className.toString() : '').toLowerCase();
    // Buttons, links, and brand/CTA/nav elements are stronger brand signals.
    var emphasis = (tag === 'button' || tag === 'a' || /btn|cta|button|brand|logo|nav|header|primary|hero/.test(cls)) ? 3 : 1;
    var props = [cs.backgroundColor, cs.color, cs.borderColor];
    for (var j = 0; j < props.length; j++) {
      var col = parseColor(props[j]);
      if (!col) continue;
      if (saturation(col) < 0.2) continue;          // skip greys / near-white / near-black
      var lt = lightness(col);
      if (lt < 0.07 || lt > 0.95) continue;
      add(col, (j === 0 ? 2 : 1) * emphasis);        // backgrounds weigh more than text
    }
  }

  var entries = Object.keys(scored).map(function (h) { return { hex: h, score: scored[h].score, c: scored[h].c }; });
  entries.sort(function (a, b) { return b.score - a.score; });
  var picked = [];
  for (var e = 0; e < entries.length && picked.length < 5; e++) {
    var ok = true;
    for (var p = 0; p < picked.length; p++) { if (dist(entries[e].c, picked[p].c) < 40) { ok = false; break; } }
    if (ok) picked.push(entries[e]);
  }
  var roles = ['primary', 'secondary', 'accent', 'color-4', 'color-5'];
  var colors = picked.map(function (c, idx) { return { name: roles[idx], hex: c.hex }; });

  // ---- color scheme ----
  var bgEl = parseColor(getComputedStyle(document.body).backgroundColor);
  var colorScheme = (bgEl && lightness(bgEl) < 0.45) ? 'dark' : 'light';

  // ---- fonts: headings, body, mono ----
  var headingEl = document.querySelector('h1, h2, h3');
  var headingFont = headingEl ? cleanFont(getComputedStyle(headingEl).fontFamily) : null;
  var bodyFont = cleanFont(getComputedStyle(document.body).fontFamily);
  var monoEl = document.querySelector('code, pre, kbd');
  var monoFont = monoEl ? cleanFont(getComputedStyle(monoEl).fontFamily) : null;
  var fonts = [];
  if (headingFont) fonts.push({ name: headingFont, usage: 'headings' });
  if (bodyFont && bodyFont.toLowerCase() !== (headingFont || '').toLowerCase()) fonts.push({ name: bodyFont, usage: 'body' });
  if (monoFont && monoFont.toLowerCase() !== (bodyFont || '').toLowerCase()) fonts.push({ name: monoFont, usage: 'mono' });

  // ---- logo: inline SVG (as a data URI) → <img> logo → declared icon → Open Graph image ----
  function serializeSvg(svg) {
    try {
      var clone = svg.cloneNode(true);
      if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      var str = new XMLSerializer().serializeToString(clone);
      if (str.length > 30000) return null;
      return 'data:image/svg+xml,' + encodeURIComponent(str);
    } catch (e) { return null; }
  }
  function pickLogo() {
    var svgSels = ['a[href="/"] svg', '[class*="logo" i] svg', 'header svg', 'nav svg'];
    for (var s = 0; s < svgSels.length; s++) {
      var svg = document.querySelector(svgSels[s]);
      if (svg) { var rc = svg.getBoundingClientRect(); if (rc.width >= 16 && rc.width <= 640 && rc.height >= 8) { var data = serializeSvg(svg); if (data) return data; } }
    }
    var imgSels = ['[class*="logo" i] img', 'img[alt*="logo" i]', 'header a[href="/"] img', 'header img'];
    for (var i2 = 0; i2 < imgSels.length; i2++) {
      var img = document.querySelector(imgSels[i2]);
      // Guard against a full-width banner image matching a "logo" selector by
      // rejecting anything outside a plausible logo size, the same way the
      // SVG branch above does with getBoundingClientRect().
      if (img && img.naturalWidth >= 16 && img.naturalWidth <= 640 && img.naturalHeight >= 8) {
        var src = img.currentSrc || img.getAttribute('src');
        if (src) return abs(src);
      }
    }
    var icon = document.querySelector('link[rel="apple-touch-icon"], link[rel~="icon"]');
    if (icon && icon.href) return abs(icon.href);
    var ogImage = getMetaContent('meta[property="og:image"]');
    if (ogImage) return abs(ogImage);
    return '';
  }

  var name = getMetaContent('meta[property="og:site_name"]') ||
    (document.title ? document.title.split(/[-|–—·•:]/)[0].trim() : '') ||
    location.hostname.replace(/^www\\./, '');
  var description = getMetaContent('meta[name="description"]') || getMetaContent('meta[property="og:description"]') || '';

  return JSON.stringify({
    name: name,
    description: description,
    logoUrl: pickLogo(),
    colorScheme: colorScheme,
    colors: colors,
    fonts: fonts
  });
})();
`;
```

## 6. Drive the browser and return the brand kit

Now write the Worker that accepts a `url` query parameter, loads the page in Browser Run, runs the script, and returns the result. Two details matter:

- `page.setBypassCSP(true)` lets the in-page script run even on sites with a strict `Content-Security-Policy` (such as GitHub or Stripe), which would otherwise block injected scripts.
- `waitUntil: "networkidle2"` waits until the page has settled, so client-rendered styles are in place before you read them.

Replace the contents of `src/index.ts` with the following Worker:

```js
import puppeteer from "@cloudflare/puppeteer";
import { BRAND_SCRIPT } from "./extract";

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Normalize a URL into a stable cache key. This intentionally drops the
// query string and hash, since most sites don't change their brand kit
// (colors, fonts, logo) based on query parameters. If you're extracting
// brand kits for sites that do (for example, a `?theme=dark` toggle),
// include the relevant search params in the key below.
const cacheKeyFor = (url) => {
	const path = url.pathname.replace(/\/+$/, "");
	return `brand:${url.host.toLowerCase()}${path}`;
};

const getTargetUrl = (request) => {
	const target = new URL(request.url).searchParams.get("url");
	if (!target) {
		throw new Error("Missing url query parameter");
	}
	const url = new URL(target);
	// Only render real, public HTTP(S) pages.
	if (!["http:", "https:"].includes(url.protocol)) {
		throw new Error("Only HTTP and HTTPS URLs are allowed");
	}
	return url;
};

const extractBrand = async (env, url) => {
	const browser = await puppeteer.launch(env.BROWSER);
	try {
		const page = await browser.newPage();
		// Allow the in-page script to run even on strict-CSP sites.
		await page.setBypassCSP(true);
		await page.goto(url.toString(), {
			waitUntil: "networkidle2",
			timeout: 30000,
		});

		// Read the real computed styles, meta tags, and logo from the DOM.
		const raw = await page.evaluate(BRAND_SCRIPT);
		return JSON.parse(raw);
	} finally {
		await browser.close();
	}
};

export default {
	async fetch(request, env) {
		try {
			const url = getTargetUrl(request);
			const key = cacheKeyFor(url);

			// 1. Cache hit → return instantly without driving the browser.
			const cached = await env.CACHE.get(key, "json");
			if (cached) {
				return Response.json({
					cached: true,
					url: url.toString(),
					brand: cached,
				});
			}

			// 2. Cache miss → run the browser, then cache the result.
			const brand = await extractBrand(env, url);
			await env.CACHE.put(key, JSON.stringify(brand), {
				expirationTtl: CACHE_TTL_SECONDS,
			});

			return Response.json({ cached: false, url: url.toString(), brand });
		} catch (error) {
			return Response.json(
				{ error: error instanceof Error ? error.message : "Unknown error" },
				{ status: 400 },
			);
		}
	},
};
```

```ts
import puppeteer from "@cloudflare/puppeteer";
import { BRAND_SCRIPT, type BrandKit } from "./extract";

interface Env {
	BROWSER: Fetcher;
	CACHE: KVNamespace;
}

const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Normalize a URL into a stable cache key. This intentionally drops the
// query string and hash, since most sites don't change their brand kit
// (colors, fonts, logo) based on query parameters. If you're extracting
// brand kits for sites that do (for example, a `?theme=dark` toggle),
// include the relevant search params in the key below.
const cacheKeyFor = (url: URL) => {
	const path = url.pathname.replace(/\/+$/, "");
	return `brand:${url.host.toLowerCase()}${path}`;
};

const getTargetUrl = (request: Request) => {
	const target = new URL(request.url).searchParams.get("url");
	if (!target) {
		throw new Error("Missing url query parameter");
	}
	const url = new URL(target);
	// Only render real, public HTTP(S) pages.
	if (!["http:", "https:"].includes(url.protocol)) {
		throw new Error("Only HTTP and HTTPS URLs are allowed");
	}
	return url;
};

const extractBrand = async (env: Env, url: URL): Promise<BrandKit> => {
	const browser = await puppeteer.launch(env.BROWSER);
	try {
		const page = await browser.newPage();
		// Allow the in-page script to run even on strict-CSP sites.
		await page.setBypassCSP(true);
		await page.goto(url.toString(), {
			waitUntil: "networkidle2",
			timeout: 30000,
		});

		// Read the real computed styles, meta tags, and logo from the DOM.
		const raw = (await page.evaluate(BRAND_SCRIPT)) as string;
		return JSON.parse(raw) as BrandKit;
	} finally {
		await browser.close();
	}
};

export default {
	async fetch(request, env): Promise<Response> {
		try {
			const url = getTargetUrl(request);
			const key = cacheKeyFor(url);

			// 1. Cache hit → return instantly without driving the browser.
			const cached = await env.CACHE.get<BrandKit>(key, "json");
			if (cached) {
				return Response.json({ cached: true, url: url.toString(), brand: cached });
			}

			// 2. Cache miss → run the browser, then cache the result.
			const brand = await extractBrand(env, url);
			await env.CACHE.put(key, JSON.stringify(brand), {
				expirationTtl: CACHE_TTL_SECONDS,
			});

			return Response.json({ cached: false, url: url.toString(), brand });
		} catch (error) {
			return Response.json(
				{ error: error instanceof Error ? error.message : "Unknown error" },
				{ status: 400 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

The Worker checks KV first. On a cache miss, it launches a browser, loads the page, runs the extraction script, caches the result for seven days, and returns the brand kit as JSON.

## 7. Test the extractor

1. Start your Worker in remote mode so Browser Run runs against managed headless Chrome:npmyarnpnpm

   ```
   npx wrangler dev --remote
   ```

   ```
   yarn wrangler dev --remote
   ```

   ```
   pnpm wrangler dev --remote
   ```


2. In another terminal, request a brand kit:

   ```bash
   curl "http://localhost:8787/?url=https://www.cloudflare.com/"
   ```

   The response is a JSON object with the extracted `name`, `description`, `logoUrl`, `colorScheme`, `colors`, and `fonts`. Request the same URL again and `cached` will be `true`.

## 8. Deploy

1. Deploy the Worker after local validation:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```


2. After deployment, request a brand kit from your Worker URL:

   ```bash
   curl "https://<YOUR_WORKER_HOSTNAME>/?url=https://www.cloudflare.com/"
   ```



## Extend the extractor

The same `page.evaluate()` pattern can read any computed style on the page. From here you can capture more of the design system:

- **Type scale** — read `font-size`, `line-height`, `font-weight`, and `letter-spacing` from `h1`– `h6`, `p`, and `small`.
- **Border radii** — sample `border-radius` from buttons, inputs, and cards to build a radius scale.
- **Shadows** — collect `box-shadow` values from cards and modals to build an elevation scale.
- **Component tokens** — find the page's primary button and capture its background, text color, radius, and padding.

Because everything is read from real computed styles, the values reflect what the site actually renders rather than what a model guesses.

## Production considerations

- **Guard user-supplied URLs.** If the URL comes from untrusted input, block private and link-local addresses ( `localhost`, `10.0.0.0/8`, `192.168.0.0/16`, `169.254.0.0/16`) to avoid [server-side request forgery ↗](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery), and only allow `http:` and `https:` schemes.
- **Reuse browser sessions under load.** Instead of `puppeteer.launch()` on every request, reuse idle sessions with [`puppeteer.sessions()`](https://developers.cloudflare.com/browser-run/puppeteer/) and `puppeteer.connect()`, and call `disconnect()` (not `close()`) to keep the session warm for the next request. This avoids cold-start time and helps you stay within [concurrency limits](https://developers.cloudflare.com/browser-run/limits/).
- **Cache aggressively.** Extraction is the expensive step. Keying the KV cache by normalized URL with the `cacheKeyFor` function makes repeat lookups instant and keeps you within Browser Run limits.

Note

`wrangler dev --remote` runs Browser Run against Cloudflare's network. Browser Run is not available in fully local development mode, so use `--remote` when testing locally.

## Related resources

- [Cloudflare's Puppeteer fork](https://developers.cloudflare.com/browser-run/puppeteer/)
- [Browser Run limits](https://developers.cloudflare.com/browser-run/limits/)
- [Workers KV](https://developers.cloudflare.com/kv/)
- [Other Puppeteer examples ↗](https://github.com/cloudflare/puppeteer/tree/main/examples)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/extract-brand-kit/#page","headline":"Extract a brand kit from any website","description":"Use Browser Run and Puppeteer to read a site's real computed styles, colors, fonts, and logo, then return a structured brand kit from a Worker.","url":"https://developers.cloudflare.com/browser-run/how-to/extract-brand-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
