---
description: Review audit log events for configuration changes made to Cloudflare Queues.
title: Audit Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Audit Logs

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/platform/audit-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to Queues. This functionality is always enabled.

## Viewing audit logs

To view audit logs for your Queue in the Cloudflare dashboard, go to the **Audit logs** page.

[Go to **Audit logs** ↗](https://dash.cloudflare.com/?to=/:account/audit-log)

For more information on how to access and use audit logs, refer to [Review audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

## Logged operations

The following configuration actions are logged:

| Operation              | Description                                                         | |  CreateQueue | Creation of a new queue. |
| ---------------------- | ------------------------------------------------------------------- | -------------- | ------------------------ |
| DeleteQueue            | Deletion of an existing queue.                                      |                |                          |
| UpdateQueue            | Updating the configuration of a queue.                              |                |                          |
| AttachConsumer         | Attaching a consumer, including HTTP pull consumers, to the Queue.  |                |                          |
| RemoveConsumer         | Removing a consumer, including HTTP pull consumers, from the Queue. |                |                          |
| UpdateConsumerSettings | Changing Queues consumer settings.                                  |                |                          |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/platform/audit-logs/#page","headline":"Audit Logs · Cloudflare Queues docs","description":"Review audit log events for configuration changes made to Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/platform/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
