---
description: Detect domain and logo impersonation attempts.
title: Brand Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

#  Brand Protection

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/learning-paths/application-security/security-center/brand-protection/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Brand Protection allows you to proactively identify and mitigate domain impersonation and phishing attacks. By monitoring newly registered domains and visual assets across the Internet, Cloudflare helps protect your brand's reputation and prevents your customers or employees from submitting sensitive information to fraudulent sites.

Common threats include:

* [Typosquatting ↗](https://en.wikipedia.org/wiki/Typosquatting): For example, typing `cloudfalre.com` instead of `cloudflare.com`.
* Concatenation of services (`cloudflare-service.com`) often registered by attackers to trick unsuspecting victims into submitting private information such as passwords.
* [Homoglyph attacks ↗](https://en.wikipedia.org/wiki/IDN%5Fhomograph%5Fattack) that use lookalike characters to trick unsuspecting victims.

## Types of queries

1. [Domain search](https://developers.cloudflare.com/security-center/brand-protection/#domain-search): allows you to search for domains that might be trying to impersonate your brand.
2. [Logo search](https://developers.cloudflare.com/security-center/brand-protection/#logo-queries): allows you to search for logos that might look and feel like your brand's logo.

## Alerts

Brand Protection integrates with Cloudflare's ANS (Alerts Notification Service) to provide configurable alerts when new domains are detected.

Any matches that are found during the new domain search are then inserted into an internal alerts table which triggers an alert for the user. This allows you to receive real-time notifications and take immediate action to investigate and potentially block any suspicious domains that may be attempting to impersonate your brand.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/security-center/brand-protection/#page","headline":"Brand Protection · Cloudflare Learning Paths","description":"Detect domain and logo impersonation attempts.","url":"https://developers.cloudflare.com/learning-paths/application-security/security-center/brand-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
