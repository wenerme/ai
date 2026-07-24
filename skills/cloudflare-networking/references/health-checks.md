---
description: Monitor origin server availability and get notified of status changes.
title: Health Checks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/health-checks/llms.txt
> Use this file to discover all available pages before exploring further.

# Health Checks

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/health-checks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

---

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

Standalone Health Checks monitors an IP address or hostname for origin servers or applications and notifies you in near real-time if there happens to be a problem.

A health check is a service that runs on Cloudflare's edge network to monitor whether an origin server is online. This allows you to view the health of your origin servers even if there is only one origin or you do not yet need to balance traffic across your infrastructure.

Health Checks support various configurations to hone in on what you can check, including response codes, protocol types, and intervals. You can specify a particular path if an origin server serves multiple applications or check a larger subset of response codes for your staging environment. All of these options allow you to properly target your Health Check, providing a precise picture of what is wrong with an origin server.

Note

Standalone Health Checks are different from health monitors associated with load balancers. For more details about health monitors, refer to the [Load Balancing documentation](https://developers.cloudflare.com/load-balancing/monitors/).

---

## Features

[Health Checks Analytics](https://developers.cloudflare.com/health-checks/health-checks-analytics/)

You can use Health Checks Analytics to evaluate origin uptime, latency, failure reason, and specific event logs to debug possible origin issues.

Use Health Checks Analytics

---

## Related products

[Load Balancing](https://developers.cloudflare.com/load-balancing/)

Cloudflare Load Balancing distributes traffic across your [endpoints](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/), which reduces endpoint strain and latency and improves the experience for end users.

---

## Availability

|                  | Free | Pro | Business | Enterprise |
| ---------------- | ---- | --- | -------- | ---------- |
| Availability     | No   | Yes | Yes      | Yes        |
| Number of checks | 0    | 10  | 50       | 1,000      |
| Analytics        | No   | Yes | Yes      | Yes        |

---

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/health-checks/#page","headline":"Health Checks · Cloudflare Health Checks docs","description":"Monitor origin server availability and get notified of status changes.","url":"https://developers.cloudflare.com/health-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
