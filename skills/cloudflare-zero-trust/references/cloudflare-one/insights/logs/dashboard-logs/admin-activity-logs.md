---
description: Monitor when a member on your account creates, updates, or deletes configurations.
title: Admin activity logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Admin activity logs

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Admin activity logs record configuration changes made by members of your Cloudflare account. These logs are useful for auditing who changed a policy or setting and investigating unexpected configuration changes. Use these logs to monitor when a member creates, updates, or deletes configurations in your [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#create-a-zero-trust-organization).

To view admin activity logs, log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Insights** \> **Logs** \> **Admin activity logs**.

## Explanation of the fields

| Field           | Description                                      | Example Value                                                                              |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Email           | User who performed the action                    | [josephli@cloudflare.com](mailto:josephli@cloudflare.com)                                  |
| Product         | Cloudflare product being modified                | Tunnel                                                                                     |
| Resource        | Specific resource type within the product        | Route                                                                                      |
| Event           | Action performed (Create, Update, Delete)        | Create                                                                                     |
| Date            | Timestamp of when the action occurred            | April 30, 2026 • 12:19 AM                                                                  |
| User IP Address | IP address of the user who made the change       | 2a09:bac6:6447:523::83:30                                                                  |
| Interface       | How the change was initiated                     | API                                                                                        |
| Audit record    | Unique identifier for the audit log entry        | caf1a547-17cc-484a-b4ce-5d3b32771a8f                                                       |
| Old value       | Previous configuration state (empty for creates) |                                                                                            |
| New value       | New configuration state after the change         | JSON object with fields like comment, network, tun\_type, tunnel\_id, virtual\_network\_id |

## Export admin activity logs

Enterprise users can export admin activity logs to a third-party storage destination or SIEM using [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). For a list of all available fields, refer to [Audit Logs V2](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs%5Fv2/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/#page","headline":"Admin activity logs · Cloudflare One docs","description":"Monitor when a member on your account creates, updates, or deletes configurations.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
