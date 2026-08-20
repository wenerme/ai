---
description: The Cloudflare Web Application Firewall (WAF) provides automatic protection from vulnerabilities and the flexibility to create custom rules.
title: Cloudflare Web Application Firewall
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Web Application Firewall

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Get automatic protection from vulnerabilities and the flexibility to create custom rules.

Available on all plans

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web and API requests and filters undesired traffic based on sets of rules called rulesets. The WAF uses the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/), a flexible expression syntax that lets you filter traffic by request properties such as IP address, URL path, headers, and body content.

Learn how to [get started](https://developers.cloudflare.com/waf/get-started/).

---

## Features

[Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/)

Compare requests with an application-specific expected structure. Review profile detections before mitigating violations with Custom Rules.

Use Application Profiles

[Custom rules](https://developers.cloudflare.com/waf/custom-rules/)

Create your own custom rules to protect your website and your APIs from malicious incoming traffic. Use advanced features like [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) and [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/) in your custom rules.

Use Custom rules

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)

Define rate limits for incoming requests matching an expression, and the action to take when those rate limits are reached.

Use Rate limiting rules

[Managed rules](https://developers.cloudflare.com/waf/managed-rules/)

Enable the pre-configured managed rulesets to get immediate protection. These rulesets are [regularly updated](https://developers.cloudflare.com/waf/change-log/), offering advanced zero-day vulnerability protections, and you can adjust their behavior.

Use Managed rules

[Account-level configuration](https://developers.cloudflare.com/waf/account/)

Enterprise-only

Create and deploy rulesets to multiple Enterprise zones.

Use Account-level configuration

[Security Events](https://developers.cloudflare.com/waf/analytics/security-events/)

Review mitigated requests (rule matches) using an intuitive interface. Tailor your security configurations based on sampled logs.

Explore Security Events

[Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/)

Displays information about all incoming HTTP requests, including those not affected by security measures.

Explore Security Analytics

## Availability

| Feature                         | Free                      | Pro | Business        | Enterprise  |
| ------------------------------- | ------------------------- | --- | --------------- | ----------- |
| Attack score                    | No                        | No  | Yes (one field) | Yes         |
| Leaked credentials detection    | Yes (one field)           | Yes | Yes             | Yes         |
| Malicious uploads detection     | No                        | No  | No              | Paid add-on |
| AI Security for Apps            | No                        | No  | No              | Paid add-on |
| Custom rules                    | Yes                       | Yes | Yes             | Yes         |
| Rate limiting rules             | Yes (one rule)            | Yes | Yes             | Yes         |
| Advanced Rate Limiting          | No                        | No  | No              | Paid add-on |
| WAF Managed Rules               | Free Managed Ruleset only | Yes | Yes             | Yes         |
| Sensitive Data Detection (SDD)  | No                        | No  | No              | Yes         |
| Account-level WAF configuration | No                        | No  | No              | Yes         |
| Custom lists                    | Yes                       | Yes | Yes             | Yes         |
| Managed IP Lists                | No                        | No  | No              | Yes         |
| Email Address Obfuscation       | Yes                       | Yes | Yes             | Yes         |
| Hotlink Protection              | Yes                       | Yes | Yes             | Yes         |
| Replace insecure JS libraries   | Yes                       | Yes | Yes             | Yes         |
| IP Access rules                 | Yes                       | Yes | Yes             | Yes         |
| User Agent Blocking             | Yes                       | Yes | Yes             | Yes         |
| Zone Lockdown                   | Yes                       | Yes | Yes             | Yes         |
| Security Analytics (zone)       | Yes                       | Yes | Yes             | Yes         |
| Security Analytics (account)    | No                        | No  | Yes             | Yes         |
| Security Events                 | Yes (sampled logs only)   | Yes | Yes             | Yes         |
| Security Events alerts          | No                        | No  | Yes             | Yes         |
| Advanced Security Events alerts | No                        | No  | No              | Yes         |

This is a summary of available features per Cloudflare plan. Refer to the documentation of individual features for more details.

---

## Related products

[DDoS Protection](https://developers.cloudflare.com/ddos-protection/)

Cloudflare DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised.

[Client-side security](https://developers.cloudflare.com/client-side-security/)

Client-side security (formerly known as Page Shield) is a comprehensive client-side security solution to ensure the safety of your website visitors' browser environment.

[Bots](https://developers.cloudflare.com/bots/)

Cloudflare bot solutions identify and mitigate automated traffic to protect your domain from bad bots.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/#page","headline":"Overview · Cloudflare Web Application Firewall (WAF) docs","description":"The Cloudflare Web Application Firewall (WAF) provides automatic protection from vulnerabilities and the flexibility to create custom rules.","url":"https://developers.cloudflare.com/waf/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
