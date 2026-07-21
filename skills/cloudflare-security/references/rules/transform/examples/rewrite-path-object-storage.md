---
description: Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/files/...` URI paths to `/...`.
title: Rewrite path for object storage bucket
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rewrite path for object storage bucket

Create a URL rewrite rule (part of Transform Rules) to remove `/files/` from URI paths before routing request to your object storage bucket.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-object-storage/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To remove `/files/` from URI paths before routing request to your object storage bucket, create a new URL rewrite rule and define a dynamic URL path rewrite using [wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters):

**When incoming requests match**

* **Wildcard pattern**
  * **Request URL**: `https://<YOUR_HOSTNAME>/files/*`

**Then rewrite the path and/or query**

* **Target path**: \[`/`\] `files/*`
* **Rewrite to**: \[`/`\] `${1}`

Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup. Then, use [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/) to route traffic to an object storage bucket.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-path-object-storage/#page","headline":"Rewrite path for object storage bucket · Cloudflare Rules docs","description":"Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /files/... URI paths to /....","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-path-object-storage/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
