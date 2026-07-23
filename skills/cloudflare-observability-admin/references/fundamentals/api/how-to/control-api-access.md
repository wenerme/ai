---
description: Restrict Cloudflare API access at the account or member level using Enterprise account controls.
title: Control API Access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Control API Access

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Super administrators of an Enterprise account are capable of selectively scoping the API access. API access can be restricted for the entire account or only for specified account members.

Note that the feature does not disable API calls not related to the Enterprise account.

## Account-level access control

To restrict the API access for the entire account:

1. In the Cloudflare dashboard, go to the **Members** page.
[Go to **Members** ↗](https://dash.cloudflare.com/?to=/:account/members)
2. Locate the **Enable API Access** section and then update the setting.

## Member-level access control

Note

Member-level settings will override the account-level setting. If a specific member has API access enabled whereas the account has the access disabled, that member can still call APIs related to the Enterprise account.

To restrict the API access for a specific member:

1. In the Cloudflare dashboard, go to the **Members** page.
[Go to **Members** ↗](https://dash.cloudflare.com/?to=/:account/members)
2. Click on the member to expand and choose the intended **API Access**. If `Account Default`, then it follows the account level setting.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/#page","headline":"Control API Access · Cloudflare Fundamentals docs","description":"Restrict Cloudflare API access at the account or member level using Enterprise account controls.","url":"https://developers.cloudflare.com/fundamentals/api/how-to/control-api-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
