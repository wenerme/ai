---
description: Identify why a Browser Run session closed and review common close reason codes in the dashboard.
title: Browser close reasons
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser close reasons

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/reference/browser-close-reasons/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A browser session may close for a variety of reasons, including normal completion, inactivity, connection errors, or errors in the headless browser instance. As a best practice, wrap `puppeteer.connect` or `puppeteer.launch` in a [try...catch ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement to handle unexpected closures gracefully.

To find the reason that a browser closed:

1. In the Cloudflare dashboard, go to the **Browser Run** page.
[Go to **Browser Run** ↗](https://dash.cloudflare.com/?to=/:account/workers/browser-run)
2. Select the **Runs** tab.

Browser Run sessions are billed based on [usage](https://developers.cloudflare.com/browser-run/pricing/). We do not charge for sessions that error due to underlying Browser Run infrastructure.

## Close reasons

| Reason               | Description                                                                                                                                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Normal closure**   | Your code called browser.close() and the session ended normally. No action needed.                                                                                                                                                                                                                                |
| **Browser idle**     | The session received no commands for the configured inactivity timeout (60 seconds by default, up to 10 minutes with [keep\_alive](https://developers.cloudflare.com/browser-run/puppeteer/#keep-alive)). To prevent idle closures, send commands within the inactivity window or increase the keep\_alive value. |
| **Chromium crashed** | The Chromium instance inside the session crashed, often because the page consumed too much memory (large DOMs, heavy JavaScript, or many concurrent pages). Try reducing page complexity, closing unused pages, or breaking work into smaller tasks.                                                              |
| **Connection error** | The connection between the client and Browser Run was interrupted. This can be caused by network issues, your Worker reaching its CPU time limit, or a WebSocket disconnection. Retry the operation with a try...catch block.                                                                                     |
| **Session evicted**  | Browser Run recycled the session due to infrastructure maintenance or a new release deployment. This is not caused by your code. Retry the operation with a try...catch block and reconnection logic.                                                                                                             |

## Handling unexpected closures

Sessions can close at any time due to infrastructure events, network issues, or browser crashes. Design your code to handle these cases by wrapping browser operations in a `try...catch` block and reconnecting when needed.

```js
async function runBrowser(env) {
  let browser;
  try {
    browser = await puppeteer.launch(env.MYBROWSER);
    const page = await browser.newPage();
    await page.goto("https://example.com");
    // Your browser automation logic
  } catch (error) {
    console.error("Browser session ended unexpectedly:", error.message);
    // Retry or return an error response
  } finally {
    await browser?.close();
  }
}
```

For long-running or critical workflows, consider adding retry logic:

```js
async function runWithRetry(env, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await runBrowser(env);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.log(`Attempt ${attempt} failed, retrying...`);
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/browser-close-reasons/#page","headline":"Browser close reasons · Cloudflare Browser Run docs","description":"Identify why a Browser Run session closed and review common close reason codes in the dashboard.","url":"https://developers.cloudflare.com/browser-run/reference/browser-close-reasons/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
