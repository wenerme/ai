---
title: How it works
description: How Security Insights scans your account and produces security findings.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How it works

Once you [enable Security Insights](https://developers.cloudflare.com/security-center/get-started/), Cloudflare runs regular security scans on your account. These scans check your Cloudflare account settings, DNS record configurations, and product configurations — such as SSL/TLS, WAF, and Access — across all domains in your account.

Each scan compares your current configuration against a set of ideal product configurations that indicate a strong security posture. When your configuration does not match an ideal configuration for one or more checks, the scan produces a **Security Insight** — a finding that represents a potential risk.

The [list of insights](https://developers.cloudflare.com/security/security-insights/) may include potential security threats, vulnerabilities, compliance risks, insecure configurations, or any other identified risks.

Note

Security Insights also checks [non-proxied (DNS-only) hostnames](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records). Because these records are not routed through Cloudflare, they do not benefit from Cloudflare's application security features.

## Scan properties

Each insight has the following properties:

* **Severity**: The security risk of the insight. The severity values are: _Moderate_, _High_, and _Critical_. The higher the severity level, the higher the risk of threat to your environment.
* **Insight**: The insight description detailing the current configuration that is causing the risk or vulnerability.
* **Risk**: A description of the risk associated with not addressing the issue.
* **Type**: The insight category.

For a full list of insight types and their descriptions, refer to [Security Insights](https://developers.cloudflare.com/security/security-insights/).

## Scan frequency

Once you enable Security Insights, Cloudflare performs scans automatically. Paying customers (as defined in the table below) are re-scanned daily and can trigger a scan manually:

| Plan                                      | Scan Frequency | On-Demand |
| ----------------------------------------- | -------------- | --------- |
| Accounts on a Free, Pro, or Business plan | Every 7 days   | Yes       |
| Accounts on an Enterprise plan            | Every 3 days   | Yes       |

Eligible accounts (Business, Enterprise, or Teams plans) can also manually start a scan. Refer to [Get started](https://developers.cloudflare.com/security-center/get-started/) for instructions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security/","name":"Security dashboard"}},{"@type":"ListItem","position":3,"item":{"@id":"/security/security-insights/","name":"Security Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/security/security-insights/how-it-works/","name":"How it works"}}]}
```
