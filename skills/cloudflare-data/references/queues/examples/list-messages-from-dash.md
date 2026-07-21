---
description: Use the dashboard to fetch and acknowledge the messages currently in a queue.
title: List and acknowledge messages from the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

#  List and acknowledge messages from the dashboard

Use the dashboard to fetch and acknowledge the messages currently in a queue.

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/queues/examples/list-messages-from-dash/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## List messages from the dashboard

Listing messages from the dashboard allows you to debug Queues or queue producers without a consumer Worker. Fetching a batch of messages to preview will not acknowledge or retry the message or affect its position in the queue. The queue can still be consumed normally by a consumer Worker.

To list messages in the dashboard:

1. In the Cloudflare dashboard, go to the **Queues** page.
[ Go to **Queues** ↗ ](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue to preview messages from.
3. Select the **Messages** tab.
4. Select **List**.
5. When the list of messages loads, select the blue arrow to the right of each row to expand the message preview.

This will preview a batch of messages currently in the Queue.

## Acknowledge messages from the dashboard

Acknowledging messages from the [Cloudflare dashboard ↗](https://dash.cloudflare.com) will permanently remove them from the queue, with equivalent behavior as `ack()` in a Worker.

1. Select the checkbox to the left of each row to select the message for acknowledgement, or select the checkbox in the table header to select all messages.
2. Select **Acknowledge messages**.
3. Confirm you want to acknowledge the messages, and select **Acknowledge messages**.

This will remove the selected messages from the queue and prevent consumers from processing them further.

Refer to the [Get Started guide](https://developers.cloudflare.com/queues/get-started/) to learn how to process and acknowledge messages from a queue in a Worker.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/list-messages-from-dash/#page","headline":"Cloudflare Queues - Listing and acknowledging messages from the dashboard · Cloudflare Queues docs","description":"Use the dashboard to fetch and acknowledge the messages currently in a queue.","url":"https://developers.cloudflare.com/queues/examples/list-messages-from-dash/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
