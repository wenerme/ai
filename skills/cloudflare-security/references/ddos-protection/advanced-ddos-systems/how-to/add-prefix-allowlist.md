---
description: Allowlist trusted IP addresses or prefixes to exclude them from Advanced DDoS Protection.
title: Add an IP or prefix to the allowlist
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Add an IP or prefix to the allowlist

Last updated Jun 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To add an IP address or prefix to the Advanced DDoS Protection [allowlist](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#allowlist):

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.
[Go to **DDoS Managed Rules** ↗](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection**.
3. Under **General settings** \> **Allowlist**, select **Edit**.
4. Enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively.
5. To exclude the current prefix from the allowlist instead of including it, uncheck the **Enabled** checkbox. 6\. Select **Add**.

Allowlists support approximately 200 IP addresses in a single expression for a rule.

Important

Prefixes in the allowlist will be vulnerable to IP spoofing attacks. If an attacker can guess the source IP addresses you have allowlisted, their packets will be allowlisted.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/#page","headline":"Add an IP address/prefix to the Advanced DDoS Protection allowlist · Cloudflare DDoS Protection docs","description":"Allowlist trusted IP addresses or prefixes to exclude them from Advanced DDoS Protection.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
