---
description: Review frequently asked questions about Cloudflare Zero Trust.
title: General
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# General

Last updated Jun 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/faq/general-faq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## What is the difference between Cloudflare Gateway and 1.1.1.1?

1.1.1.1 does not block any DNS query. When a browser requests for example.com, 1.1.1.1 simply looks up the answer either in cache or by performing a full recursive DNS query.

Cloudflare Gateway's DNS resolver introduces security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat, or is requesting a blocked domain configured by an administrator as part of a Gateway policy, Gateway stops it before the site could load for the user - and potentially execute code or phish that team member.

## Is multi-factor authentication supported?

Access supports two methods of enforcing MFA:

* **Independent MFA** — Access prompts users for a second factor directly, without relying on your identity provider. You can configure MFA requirements per organization, application, or policy. For more information, refer to [Enforce independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#independent-mfa).
* **Identity provider-based MFA** — Access respects the [MFA policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#identity-provider-based-mfa) set in your identity provider. For example, if your users are logging into an Access protected app through Okta, Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

## Which browsers are supported?

These browsers are supported:

* Internet Explorer 11
* Edge (current release, last release)
* Firefox (current release, last release)
* Chrome (current release, last release)
* Safari (current release, last release)

## What languages does the Cloudflare dashboard support?

The Cloudflare dashboard is available in the following languages:

* Deutsch (German)
* English
* Español (Spanish)
* Français (French)
* Italiano (Italian)
* 日本語 (Japanese)
* 한국어 (Korean)
* Português (Portuguese)
* 简体中文 (Mandarin Chinese, Simplified)
* 繁體中文 (Mandarin Chinese, Traditional)

To change your dashboard language, refer to [Profile settings](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#language).

## What data localization services are supported?

Cloudflare Zero Trust can be used with the Data Localization Suite to ensure that traffic is only inspected in the regions you choose. For more information refer to [Use Zero Trust with Data Localization Suite](https://developers.cloudflare.com/data-localization/how-to/zero-trust/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/faq/general-faq/#page","headline":"General · Cloudflare One docs","description":"Review frequently asked questions about Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/faq/general-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
