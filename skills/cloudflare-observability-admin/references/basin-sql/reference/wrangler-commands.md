---
description: Wrangler commands for querying data with Basin SQL.
title: Wrangler commands
image: https://developers.cloudflare.com/basin-sql/reference/wrangler-commands/og.png?v=04f1cc0e595fd0ce
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-sql/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler commands

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin-sql/reference/wrangler-commands/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the `basin sql` command family to query a warehouse:

npmyarnpnpm

```
npx wrangler basin sql query <WAREHOUSE_NAME> "SELECT * FROM <NAMESPACE>.<TABLE> LIMIT 10"
```

```
yarn wrangler basin sql query <WAREHOUSE_NAME> "SELECT * FROM <NAMESPACE>.<TABLE> LIMIT 10"
```

```
pnpm wrangler basin sql query <WAREHOUSE_NAME> "SELECT * FROM <NAMESPACE>.<TABLE> LIMIT 10"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin-sql/reference/wrangler-commands/#page","headline":"Wrangler commands","description":"Wrangler commands for querying data with Basin SQL.","url":"https://developers.cloudflare.com/basin-sql/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-sql/reference/wrangler-commands/og.png?v=04f1cc0e595fd0ce","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
