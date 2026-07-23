---
description: Review DNS migration best practices summary.
title: Key considerations and best practices summary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Key considerations and best practices summary

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/summary-considerations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* Plan meticulously: Do not rush the planning and preparation phases.
* Communicate clearly: Keep stakeholders informed.
* Lower TTLs in advance: This is crucial for a faster cutover.
* Disable DNSSEC before NS change (safest): Remove DS records at the registrar well before changing nameservers, then re-enable DNSSEC via Cloudflare.
* Verify, verify, verify: Double-check record imports and functionality at each stage.
* Test thoroughly: From multiple locations and for all critical services.
* Have a rollback plan: Know how to revert if necessary.
* Migrate during low traffic: Minimize potential user impact.
* Address BIND Views/ACLs: Understand how Cloudflare will handle or replace this functionality.
* Take advantage of Cloudflare features: Once stable, explore and implement Cloudflare's security and performance enhancements.

By following these best practices, you can significantly increase the likelihood of a smooth and successful migration from your on-prem BIND DNS to Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/summary-considerations/#page","headline":"Key considerations and best practices summary · Cloudflare Learning Paths","description":"Review DNS migration best practices summary.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/summary-considerations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
