---
description: Detect and notify about insecure JavaScript libraries on your site.
title: Replace insecure JS libraries
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Replace insecure JS libraries

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/tools/replace-insecure-js-libraries/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This feature, when turned on, automatically rewrites URLs to external JavaScript libraries to point to Cloudflare-hosted libraries instead. This change improves security and performance, and reduces the risk of malicious code being injected.

This rewrite operation currently supports the `polyfill` JavaScript library hosted in `polyfill.io`.

Caution

You may need to update your Content Security Policy (CSP) when turning on **Replace insecure JavaScript libraries**. The feature, when enabled, will not perform any URL rewrites if a CSP is present with a `script-src` or `default-src` directive. Cloudflare will not check `report-only` directives and it will not modify CSP headers.

Additionally, if you are defining a CSP via HTML `meta` tag, you must either turn off this feature or switch to a CSP defined in an HTTP header.

## How it works

When turned on, Cloudflare will check HTTP(S) proxied traffic for `script` tags with an `src` attribute pointing to a potentially insecure service and replace the `src` value with the equivalent link hosted under [cdnjs ↗](https://cdnjs.cloudflare.com/).

The rewritten URL will keep the original URL scheme (`http://` or `https://`).

For `polyfill.io` URL rewrites, all `3.*` versions of the `polyfill` library are supported under the `/v3` path. Additionally, the `/v2` path is also supported. If an unknown version is requested under the `/v3` path, Cloudflare will rewrite the URL to use the latest `3.*` version of the library (currently `3.111.0`).

## Availability

The feature is available in all Cloudflare plans, and is turned on by default on Free plans.

---

## Configure

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Turn **Replace insecure JavaScript libraries** on or off.

Issue a `PATCH` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/replace_insecure_js" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"value": "on"
	}'
```

---

## Final remarks

Since [pages.dev zones](https://developers.cloudflare.com/pages/configuration/preview-deployments/) are on a Free plan, the **Replace insecure JavaScript libraries** feature is turned on by default on these zones and it is not possible to turn it off.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/replace-insecure-js-libraries/#page","headline":"Replace insecure JavaScript libraries · Cloudflare Web Application Firewall (WAF) docs","description":"Detect and notify about insecure JavaScript libraries on your site.","url":"https://developers.cloudflare.com/waf/tools/replace-insecure-js-libraries/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","CSP"]}
```
