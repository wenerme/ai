---
description: scheduled events are automatically dispatched according to the specified cron
triggers:
title: Scheduled Events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Scheduled Events

Last updated Sep 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

* [ScheduledEvent Reference](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)

## Cron Triggers

`scheduled` events are automatically dispatched according to the specified cron triggers:

```js
const mf = new Miniflare({
	crons: ["15 * * * *", "45 * * * *"],
});
```

## HTTP Triggers

Because waiting for cron triggers is annoying, you can also make HTTP requests to `/cdn-cgi/local/scheduled` to trigger `scheduled` events:

```sh
$ curl "http://localhost:8787/cdn-cgi/local/scheduled"
```

To simulate different values of `scheduledTime` and `cron` in the dispatched event, use the `time` and `cron` query parameters:

```sh
$ curl "http://localhost:8787/cdn-cgi/local/scheduled?time=1000"
$ curl "http://localhost:8787/cdn-cgi/local/scheduled?cron=*+*+*+*+*"
```

## Dispatching Events

When using the API, the `getWorker` function can be used to dispatch `scheduled` events to your Worker. This can be used for testing responses. It takes optional `scheduledTime` and `cron` parameters, which default to the current time and the empty string respectively. It will return a promise which resolves to an array containing data returned by all waited promises:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async scheduled(controller, env, ctx) {
      const lastScheduledController = controller;
      if (controller.cron === "* * * * *") controller.noRetry();
    }
  }
  `,
});

const worker = await mf.getWorker();

let scheduledResult = await worker.scheduled({
	cron: "* * * * *",
});
console.log(scheduledResult); // { outcome: 'ok', noRetry: true }

scheduledResult = await worker.scheduled({
	scheduledTime: new Date(1000),
	cron: "30 * * * *",
});

console.log(scheduledResult); // { outcome: 'ok', noRetry: false }
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/#page","headline":"Scheduled Events · Cloudflare Workers docs","description":"scheduled events are automatically dispatched according to the specified cron\ntriggers:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/scheduled/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
