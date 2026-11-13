---
description: Limit Workers usage charges and understand what stops when your account reaches a limit.
title: Spending limits
image: https://developers.cloudflare.com/workers/platform/spend-management/og.png?v=137faee5828e0ba7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Spending limits

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/platform/spend-management/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Set a spending limit](https://developers.cloudflare.com/billing/manage/spend-management/) on Workers usage charges. The limit covers requests and CPU time across all Workers in your account, after included usage. It excludes the monthly subscription fee.

To configure a limit, follow [Set a spending limit in the dashboard](https://developers.cloudflare.com/billing/manage/spend-management/#set-a-spending-limit-in-the-dashboard) or [Manage spending limits and alerts with the cf CLI](https://developers.cloudflare.com/billing/manage/spend-management/cli/).

## What stops at the limit

Once the limit takes effect, Cloudflare rejects new invocations of your Workers, including:

- Incoming HTTP requests.
- Cron Triggers.
- Queue consumer invocations.
- Email Worker invocations.
- Calls from other Workers or Durable Objects.

HTTP visitors receive error `1103`. This error has other causes, so check **Billing** > **Spend Management** before contacting support. Requests rejected by the spending limit are not billed as Worker invocations.

Static assets served without running your Worker continue to be available. Requests that need Worker code, such as requests routed through `run_worker_first`, can fail. A limit does not delete your Workers or assets.

## Plan for application dependencies

A Workers limit applies to the whole account, rather than one application or environment. For example, a test Worker can reach the shared limit and interrupt a production Worker in the same account.

Durable Objects, Workers KV, R2, and other products have separate charges. A Workers spending limit does not apply to those charges. A Durable Object can also fail when it calls a Worker whose limit has been reached.

## Costs and timing

A spending limit is not an exact maximum bill. Usage reporting and blocking take time, so usage can continue after the threshold is reached. The Workers Paid subscription fee remains payable.

For a limit on the CPU time of each invocation, configure [CPU time limits](https://developers.cloudflare.com/workers/platform/limits/#cpu-time). For an email without blocking invocations, use an [email alert](https://developers.cloudflare.com/billing/manage/spend-management/cli/#create-an-email-alert).

## Resume Workers

[Raise the limit above current spend, turn it off, or remove it](https://developers.cloudflare.com/billing/manage/spend-management/#resume-service-or-change-a-limit). Changes can take a few minutes to apply.

The block also expires at the start of the next subscription billing period. An enabled limit remains in place for that new period.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/spend-management/#page","headline":"Spending limits","description":"Limit Workers usage charges and understand what stops when your account reaches a limit.","url":"https://developers.cloudflare.com/workers/platform/spend-management/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/platform/spend-management/og.png?v=137faee5828e0ba7","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
