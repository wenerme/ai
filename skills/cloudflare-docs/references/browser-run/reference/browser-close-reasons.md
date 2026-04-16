---
title: Browser close reasons
description: A browser session may close for a variety of reasons, occasionally due to connection errors or errors in the headless browser instance. As a best practice, wrap puppeteer.connect or puppeteer.launch in a try...catch statement.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-run/reference/browser-close-reasons.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Browser close reasons

A browser session may close for a variety of reasons, occasionally due to connection errors or errors in the headless browser instance. As a best practice, wrap `puppeteer.connect` or `puppeteer.launch` in a [try...catch ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement.

To find the reason that a browser closed:

1. In the Cloudflare dashboard, go to the **Browser Run** page.  
[ Go to **Browser Run** ](https://dash.cloudflare.com/?to=/:account/workers/browser-run)
2. Select the **Runs** tab.

Browser Run sessions are billed based on [usage](https://developers.cloudflare.com/browser-run/pricing/). We do not charge for sessions that error due to underlying Browser Run infrastructure.

| Reasons a session may end                            |
| ---------------------------------------------------- |
| User opens and closes browser normally.              |
| Browser is idle for 60 seconds.                      |
| Chromium instance crashes.                           |
| Error connecting with the client, server, or Worker. |
| Browser session is evicted.                          |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/browser-close-reasons/","name":"Browser close reasons"}}]}
```
