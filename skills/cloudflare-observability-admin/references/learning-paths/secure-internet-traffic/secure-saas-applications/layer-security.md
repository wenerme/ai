---
description: Combine device posture and browser isolation.
title: Layer security methods
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Layer security methods

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/layer-security/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once you have decided on a model (or mixture of models) to secure front door access to your SaaS applications, you can address other common SaaS security areas of concern by layering multiple Cloudflare controls.

## Device posture controls for managed endpoints

You can control endpoint access to your SaaS applications with device posture controls via either [Access for SaaS](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/) or [WARP enrollment settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) in Zero Trust. Device posture can determine what constitutes a managed endpoint accessing a SaaS application.

You can also define what constitutes a healthy or semi-healthy managed endpoint and invoke step-up security policies based on potential security concerns. These controls are separate from the controls enacted for unmanaged endpoints.

## Inline security for unmanaged endpoints

For unmanaged endpoints, you can deliver selective inline security like upload/download controls, HTTP filtering, and data loss detection/prevention policies in SaaS applications without the need to install agents. You can deliver inline security through Browser Isolation, but it requires a [front door control](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/sso-front-door/) (such as Access for SaaS) in order to be applied consistently.

## Browser Isolation

Cloudflare can deliver isolate SaaS apps in via either the Cloudflare One Client or static links with Clientless Web Isolation.

### Cloudflare One Client

When your users' devices are enrolled with the Cloudflare One Client, Cloudflare will transparently isolate browser sessions. In other words, a user's browser will display `example.com`, but Cloudflare will isolate the traffic by rendering it in an isolated browser.

### Clientless Web Isolation

With [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/), Cloudflare will append a static link to the web address. For example, a user's browser going to `example.com` in an isolated session will display `<your-team-name>.cloudflareaccess.com/browser/https://www.example.com`.

When Browser Isolation isolates traffic, Cloudflare can apply the security stack of TLS decryption, HTTP inspection, network inspection, DNS filtering, and DLP policy evaluation to the traffic in the request body. This provides a solution for securing unmanaged endpoint access to sensitive systems and can potentially upgrade traffic from users or services that may have otherwise been deemed as risky. Any method for Browser Isolation attaches the user to your dedicated egress IP addresses so you can apply policies across each method of access consistently.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/layer-security/#page","headline":"Layer security methods · Cloudflare Learning Paths","description":"Combine device posture and browser isolation.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/layer-security/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
