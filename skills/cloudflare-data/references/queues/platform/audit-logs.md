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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/platform/audit-logs/#page","headline":"Audit Logs · Cloudflare Queues docs","description":"Review audit log events for configuration changes made to Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/platform/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
