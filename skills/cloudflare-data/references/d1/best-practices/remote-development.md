---
description: Develop against a D1 database remotely using the Cloudflare dashboard playground.
title: Remote development
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

# Remote development

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/d1/best-practices/remote-development/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

D1 supports remote development using the [dashboard playground](https://developers.cloudflare.com/workers/playground/#use-the-playground). The dashboard playground uses a browser version of Visual Studio Code, allowing you to rapidly iterate on your Worker entirely in your browser.

## 1\. Bind a D1 database to a Worker

Note

This guide assumes you have previously created a Worker, and a D1 database.

Users new to D1 and/or Cloudflare Workers should read the [D1 tutorial](https://developers.cloudflare.com/d1/get-started/) to install `wrangler` and deploy their first database.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select an existing Worker.
3. Go to the **Bindings** tab.
4. Select **Add binding**.
5. Select **D1 database** \> **Add binding**.
6. Enter a variable name, such as `DB`, and select the D1 database you wish to access from this Worker.
7. Select **Add binding**.

## 2\. Start a remote development session

1. On the Worker's page on the Cloudflare dashboard, select **Edit Code** at the top of the page.
2. Your Worker now has access to D1.

Use the following Worker script to verify that the Worker has access to the bound D1 database:

```js
export default {
  async fetch(request, env, ctx) {
    const res = await env.DB.prepare("SELECT 1;").run();
    return new Response(JSON.stringify(res, null, 2));
  },
};
```

## Related resources

* Learn [how to debug D1](https://developers.cloudflare.com/d1/observability/debug-d1/).
* Understand how to [access logs](https://developers.cloudflare.com/workers/observability/logs/) generated from your Worker and D1.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/best-practices/remote-development/#page","headline":"Remote development · Cloudflare D1 docs","description":"Develop against a D1 database remotely using the Cloudflare dashboard playground.","url":"https://developers.cloudflare.com/d1/best-practices/remote-development/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
