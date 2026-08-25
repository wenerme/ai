---
description: Use the dashboard to send messages to a queue.
title: Send messages from the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Send messages from the dashboard

Use the dashboard to send messages to a queue.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/examples/send-messages-from-dash/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sending messages from the dashboard allows you to debug Queues or queue consumers without a producer Worker.

To send messages from the dashboard:

1. In the Cloudflare dashboard, go to the **Queues** page.
[Go to **Queues** ↗](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue to send a message to.
3. Select the **Messages** tab.
4. Select **Send**.
5. Choose your message **Content Type**: _Text_ or _JSON_.
6. Enter your message. Alternatively, drag a file over the textbox to upload a file as a message.
7. Select **Send**.

Your message will be sent to the queue.

Refer to the [Get Started guide](https://developers.cloudflare.com/queues/get-started/) to learn how to send messages to a queue from a Worker.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/send-messages-from-dash/#page","headline":"Cloudflare Queues - Sending messages from the dashboard · Cloudflare Queues docs","description":"Use the dashboard to send messages to a queue.","url":"https://developers.cloudflare.com/queues/examples/send-messages-from-dash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
