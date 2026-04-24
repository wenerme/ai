---
title: Security Insights
description: Scan and review aggregated security risks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/application-security/security-center/insights.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security Insights

Security Insights provides you with a list of insights, covering different areas of your Cloudflare environment, such as: Cloudflare account settings, DNS record configurations, SSL/TLS certificates configurations, Cloudflare Access configurations and Cloudflare WAF configurations.

## Dashboard analytics

Security Insights focuses on your Cloudflare environment by running [security scans](https://developers.cloudflare.com/security-center/security-insights/how-it-works/#scan-frequency) at regular intervals. Instead of navigating through each of your domains to review their security issues, the Security Center aggregates all of them into a single dashboard.

![Security Insights Overview](https://developers.cloudflare.com/_astro/security-insights-overview.lQDBpBkp_1nGdoq.webp) 

The list of insights may include potential security threats, vulnerabilities, compliance risks, insecure configurations, or any other identified risks.

## Severity properties

Each insight that is discovered by the Security Insights scan will have the following properties assigned to them:

* **Severity**: The security risk of the insight. The severity values are: _Moderate_, _High_, and _Critical_. The higher the severity level, the higher the risk of threat to your environment.
* **Insight**: The insight description detailing the current configuration that is causing the risk or vulnerability.
* **Risk**: A description of the risk associated with not addressing the issue.
* **Type**: The insight category.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/security-center/","name":"Security Center"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/security-center/insights/","name":"Security Insights"}}]}
```
