---
title: Infrastructure
description: View IT assets, domains, and IP addresses associated with your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security-center/infrastructure/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Infrastructure

User permission

Only Super Admin users with edit permissions can start scans, turn scans off, or manage issues.

The **Infrastructure** tab provides an overview of the IT assets associated with your Cloudflare account, including domains, IP addresses, and related configurations.

Infrastructure data is populated by [Security Insights](https://developers.cloudflare.com/security-center/security-insights/) scans. To view data in this tab, first [enable Security Insights](https://developers.cloudflare.com/security-center/get-started/) and wait for the initial scan to complete. Initial scan time depends on the number of IT assets across the domains in your account.

To open the **Infrastructure** tab, go to Account Home > **Security Center** \> **Infrastructure**.

From the Infrastructure tab, you can:

* **Filter the displayed information** — Narrow results by specific assets, domains, or configurations to focus on areas of interest.
* **Print or download a PDF report** — Generate a report of your infrastructure overview for offline review or sharing with your team.
* **Manage your security.txt file** — Create or update a [security.txt](https://developers.cloudflare.com/security-center/infrastructure/security-file/) file that provides security researchers with a standardized way to report vulnerabilities.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/infrastructure/","name":"Infrastructure"}}]}
```
