---
description: Set a Durable Objects spending limit and understand its effects on requests, SQL storage, WebSockets, and alarms.
title: Spending limits
image: https://developers.cloudflare.com/durable-objects/platform/spend-management/og.png?v=c25147cbe21c53d5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

# Spending limits

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/durable-objects/platform/spend-management/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Set a spending limit](https://developers.cloudflare.com/billing/manage/spend-management/) for Durable Objects. It applies across your account, rather than to one namespace or object.

To configure a limit, follow [Set a spending limit in the dashboard](https://developers.cloudflare.com/billing/manage/spend-management/#set-a-spending-limit-in-the-dashboard) or [Manage spending limits and alerts with the cf CLI](https://developers.cloudflare.com/billing/manage/spend-management/cli/).

## Charges counted toward the limit

The limit counts usage charges after included usage for:

- Requests and duration.
- SQLite rows read and written.
- Key-value storage reads, writes, and deletes.

Stored data charges and the shared Workers Paid subscription fee are excluded. Stored data can continue to incur charges during a pause.

## What stops at the limit

Once the limit takes effect, Cloudflare blocks these operations:

| Operation | Behavior |
| --- | --- |
| New requests through a Durable Object stub | Rejected. |
| SQL queries | Reads and writes are rejected. |
| SQLite storage growth | Rejected. |
| New alarms through `setAlarm()` | Rejected. |
| Pending alarms | Held until the block ends, subject to the seven-day limit described in [Alarm recovery](#alarm-recovery). |

An affected operation can return `Exceeded the account's spending cap for Durable Objects.` A limit does not delete your objects or their stored data.

## Operations that can continue

A limit does not stop every source of charges:

- Requests already running can continue to accrue duration charges.
- Messages on WebSocket connections that are already open are not blocked by the limit.
- Key-value storage operations in legacy key-value-backed objects are not blocked by the limit, even though their charges count toward it.
- Existing stored data continues to incur storage charges.

Usage reporting and enforcement also take time. These limits mean that a limit does not guarantee a maximum invoice amount.

## Alarm recovery

Cloudflare holds pending alarms while the limit blocks the object. These holds do not use the alarm's normal retry budget.

Caution

An alarm scheduled more than seven days ago is deleted while held. After restoring service, your application must schedule it again if the work is still needed.

Alarms still within that limit can run once the block ends. Plan for delayed work when restoring service.

## Resume Durable Objects

[Raise the limit above current spend, turn it off, or remove it](https://developers.cloudflare.com/billing/manage/spend-management/#resume-service-or-change-a-limit). Changes can take a few minutes to apply.

The block also expires at the next subscription billing period. An enabled limit remains configured for the new period.

Workers have a [separate limit](https://developers.cloudflare.com/workers/platform/spend-management/). If the Worker that calls your object is also blocked, restore that Worker before retrying the application.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/platform/spend-management/#page","headline":"Spending limits","description":"Set a Durable Objects spending limit and understand its effects on requests, SQL storage, WebSockets, and alarms.","url":"https://developers.cloudflare.com/durable-objects/platform/spend-management/","inLanguage":"en","image":"https://developers.cloudflare.com/durable-objects/platform/spend-management/og.png?v=c25147cbe21c53d5","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
