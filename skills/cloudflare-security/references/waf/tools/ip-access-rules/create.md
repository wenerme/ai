---
description: Create IP Access rules to allow, block, or challenge by IP.
title: Create an IP access rule
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Create an IP access rule

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/tools/ip-access-rules/create/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Recommendation: Use custom rules instead

Cloudflare recommends that you create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of IP Access rules to perform IP-based or geography-based blocking (geoblocking).

Caution

For [Spectrum](https://developers.cloudflare.com/spectrum/) applications configured with the non-HTTP/HTTPS application type, IP Access rules are the only supported mechanism for filtering traffic by IP address, IP range, country, or ASN. To use them, enable IP Access rules in your [Spectrum app configuration](https://developers.cloudflare.com/spectrum/reference/configuration-options/#ip-access-rules).

Note

IP Access Rules are only available in the new security dashboard if you have configured at least one IP access rule.

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **IP access rules**.
3. Enter the following rule details:

  1. For **IP, IP range, country name, or ASN**, enter an IP address, IP range, country code/name, or Autonomous System Number (ASN). For details, refer to [IP Access rules parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/).
  2. For **Action**, select an [action](https://developers.cloudflare.com/waf/tools/ip-access-rules/actions/).
  3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.
  4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).
4. Select **Create**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Tools**.
3. Under **IP Access Rules**, enter the following details:

  1. For **Value**, enter an IP address, IP range, country code/name, or Autonomous System Number (ASN). For details, refer to [IP Access rules parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/).
  2. Select an [action](https://developers.cloudflare.com/waf/tools/ip-access-rules/actions/).
  3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.
  4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).
4. Select **Add**.

Use the Cloudflare API to programmatically create IP access rules. For more information, refer to [Create an IP Access Rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access%5Frules/methods/create/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/ip-access-rules/create/#page","headline":"Create an IP access rule · Cloudflare Web Application Firewall (WAF) docs","description":"Create IP Access rules to allow, block, or challenge by IP.","url":"https://developers.cloudflare.com/waf/tools/ip-access-rules/create/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
