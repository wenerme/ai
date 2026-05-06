---
title: Cloudflare Security Center
description: Review security insights, investigate threats, and protect your brand from impersonation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Security Center

Cloudflare Security Center brings together your Cloudflare security products, threat intelligence from Cloudflare's global network, and configuration analysis into a unified security intelligence solution. Security Center enables you to strengthen your security posture by:

* **Mapping your attack surface** — identifying the Internet-facing assets (domains, DNS records, and IP addresses) associated with your Cloudflare account
* **Providing asset inventory and discovery** — listing the infrastructure Cloudflare detects across your account so you can review what is exposed
* **Identifying potential security risks, misconfigurations, and vulnerabilities** — running automated scans that compare your current Cloudflare configuration against ideal settings
* **Helping you mitigate these risks** — connecting each finding to the relevant Cloudflare product setting so you can resolve issues from the dashboard

## Main features

* **[Security Insights](https://developers.cloudflare.com/security/security-insights/)**: Review and manage potential security risks and vulnerabilities associated with your IT infrastructure. Security Insights scans your Cloudflare account settings — including DNS records, SSL/TLS certificates, WAF configurations, and Access configurations — and reports findings with severity levels.
* **[Infrastructure](https://developers.cloudflare.com/security-center/infrastructure/)**: Review and manage your IT infrastructure. The Infrastructure tab displays the domains, IP addresses, and other assets associated with your Cloudflare account.
* **[Investigate](https://developers.cloudflare.com/security-center/investigate/)**: Investigate threats using data from Cloudflare's global network. Look up any IP address, domain, or hostname to view its category, country of origin, and passive DNS records.
* **[Security Reports](https://developers.cloudflare.com/analytics/account-and-zone-analytics/app-security-reports/)** (beta): Gain visibility into requests blocked or challenged by Cloudflare application security products, including [HTTP DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/), [WAF](https://developers.cloudflare.com/waf/), and [Bot Management](https://developers.cloudflare.com/bots/).
* **[Brand Protection](https://developers.cloudflare.com/security-center/brand-protection/)** (beta): Search for newly registered domains that may be attempting to impersonate your brand. Brand Protection monitors for typosquatting, homoglyph attacks, and service concatenation.
[ Get started ](https://developers.cloudflare.com/security-center/get-started/) 

---

## Availability

Cloudflare Security Center is available to customers on all plans.

The frequency of automatic security scans depends on your Cloudflare plan, ranging from every 7 days on Free, Pro, and Business plans to every 3 days on Enterprise plans. Refer to [Scan frequency](https://developers.cloudflare.com/security/security-insights/how-it-works/#scan-frequency) for more information.

If you have any comments, questions, or bugs to report, create a post in the [Cloudflare Community forum ↗](https://community.cloudflare.com/c/security/security-center/65).

## Limitations

* Users with an [Administrator Read Only](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles) role cannot access the Cloudflare Security Center.
* Only Cloudflare accounts with at least one Business or Enterprise zone (domain on your account), or accounts on the Teams Standard or Teams Enterprise plans, can manually start a new scan.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}}]}
```
