---
description: A WAF managed rule may block site scans performed by Bing Webmaster Tools.
title: Bing's Site Scan blocked by a managed rule
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

#  Bing's Site Scan blocked by a managed rule

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Microsoft [Bing Webmaster Tools ↗](https://www.bing.com/webmaster/tools) provides a Site Scan feature that crawls your website searching for possible SEO improvements.

Site Scan does not use the same IP address range as Bingbot (Bing's website crawler). Additionally, the [Verify Bingbot ↗](https://www.bing.com/toolbox/verify-bingbot) tool does not recognize Site Scan's IP addresses as Bingbot. Due to this reason, the WAF managed rule that blocks fake Bingbot requests may trigger for Site Scan requests. This is a known issue of Bing Webmaster Tools.

To allow Site Scan to run on your website, Cloudflare recommends that you temporarily skip the triggered WAF managed rule by creating an [exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/). After the scan finishes successfully, delete the exception to start blocking fake Bingbot requests again.

The rule you should temporarily skip is the following:

|                     | Name                                             | ID          |
| ------------------- | ------------------------------------------------ | ----------- |
| **Managed Ruleset** | Cloudflare Managed Ruleset                       | ...376e9aee |
| **Rule**            | Anomaly:Header:User-Agent - Fake Bing or MSN Bot | ...c12cf9c8 |

The exception, shown as a rule with a **Skip** action, must appear in the rules list before the rule executing the Cloudflare Managed Ruleset, or else nothing will be skipped.

To check the rule order, use one of the following methods:

* When using the old Cloudflare dashboard, the rules listed in **Security** \> **WAF** \> **Managed rules** run in order.
* When using the new security dashboard, the rules listed in **Security** \> **Security rules** run in order.
* When using the Cloudflare API, the rules in the `rules` object obtained using the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation (for your zone and for the `http_request_firewall_managed` phase) run in order.

For more information on creating exceptions, refer to [Create exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/#page","headline":"Bing's Site Scan blocked by a managed rule · Cloudflare Web Application Firewall (WAF) docs","description":"A WAF managed rule may block site scans performed by Bing Webmaster Tools.","url":"https://developers.cloudflare.com/waf/troubleshooting/blocked-bing-site-scans/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft","Debugging"]}
```
