---
description: Secure Internet traffic and SaaS apps.
title: Control traffic egress with source IP anchoring and allowlisting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Control traffic egress with source IP anchoring and allowlisting

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Now that you have created firewall policies to secure your organization, you can begin creating egress policies to control what IP address your users egress to the Internet with.

Note

The following module requires [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/), a feature only available on Enterprise plans. If you are not an Enterprise user, you can skip ahead to [Secure SaaS applications](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/).

For more information on egress policies, contact your account team.

## Objectives

By the end of this module, you will be able to:

* Understand when your organization may need source IP anchoring.
* Create egress policies to make use of dedicated egress IPs.
* Follow best practices for deploying egress IPs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/#page","headline":"Control traffic egress with source IP anchoring and allowlisting · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
