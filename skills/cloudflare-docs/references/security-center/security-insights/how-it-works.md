---
title: How it works
description: Once you enable Security Insights, Cloudflare runs regular security scans on the infrastructure associated with your Cloudflare account. These scans perform a series of checks on your Cloudflare account settings and on the configurations of different Cloudflare products for the domains in your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security-center/security-insights/how-it-works.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# How it works

Once you [enable Security Insights](https://developers.cloudflare.com/security-center/get-started/), Cloudflare runs regular security scans on the infrastructure associated with your Cloudflare account. These scans perform a series of checks on your Cloudflare account settings and on the configurations of different Cloudflare products for the domains in your Cloudflare account.

The performed checks take into account a set of ideal product configurations and states that indicate a good security posture. If your current configuration does not meet this ideal configuration for one or more checks, the Security Center will report these situations as **Security Insights**.

The list of insights may include potential security threats, vulnerabilities, compliance risks, insecure configurations, or any other identified risks.

Note

Security Insights will check non-proxied hostnames.

## Scan properties

Each insight will have the following properties assigned to them:

* **Severity**: The security risk of the insight. The severity values are: _Moderate_, _High_, and _Critical_. The higher the severity level, the higher the risk of threat to your environment.
* **Insight**: The insight description detailing the current configuration that is causing the risk or vulnerability.
* **Risk**: A description of the risk associated with not addressing the issue.
* **Type**: The insight category.

## Scan frequency

Once you enable Security Insights, Cloudflare performs scans automatically. Paying customers (as defined in the table below) are re-scanned daily and can trigger a scan manually:

| Plan                                      | Scan Frequency | On-Demand |
| ----------------------------------------- | -------------- | --------- |
| Accounts on a Free, Pro, or Business plan | Every 7 days   | Yes       |
| Accounts on an Enterprise plan            | Every 3 days   | Yes       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/security-insights/","name":"Security Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/security-center/security-insights/how-it-works/","name":"How it works"}}]}
```
