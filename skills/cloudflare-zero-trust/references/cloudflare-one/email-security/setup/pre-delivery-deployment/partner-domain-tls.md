---
description: Partner domain TLS in Email Security.
title: Partner domain TLS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Partner domain TLS

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To add additional TLS (Transport Layer Security) requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. If TLS is required, mail without TLS from the specified domain will be dropped.

Note

To enforce TLS across all emails, you will need to enforce TLS requirements when you are onboarding your domain. To only enforce TLS for specific emails, you can do so by going to **Settings** \> **Partner domain TLS** \> **Add a domain**.

To set up a partner domain:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and select **Email security**.
2. Select **Settings** \> **Partner domain TLS** \> **View**.
3. Select **Add a domain**.
4. Enter a valid domain name. You can also exclude subdomains by selecting **Add exclude**.
5. (Optional) Add an optional note to describe your rule(s).
6. Select **Save**.

To edit a partner domain, select the three dots > **Edit**.

To delete a partner domain, select the three dots > **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/#page","headline":"Partner domain TLS · Cloudflare One docs","description":"Partner domain TLS in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/partner-domain-tls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
```
