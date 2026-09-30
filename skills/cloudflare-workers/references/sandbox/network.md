---
description: Add credentials in your Worker so the sandbox never holds them, and decide which services code in a sandbox can reach.
title: Credentials and network access
image: https://developers.cloudflare.com/sandbox/network/og.png?v=8280ee4acbda7ce9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Credentials and network access

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/network/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Any process in a sandbox can read a token that the sandbox holds. Keep the token in your Worker instead, and give the sandbox only the access it needs. A Container sends requests to a hostname that you choose, and your Worker intercepts each request and adds the token. A Dynamic Worker calls a method that your Worker passes it, and the method adds the token.

A Container that starts with `enableInternet: false` reaches only the hostnames you intercept. A Dynamic Worker loaded with `globalOutbound: null` cannot make its own requests, and reaches your application only through the methods you pass.

- [Call an authenticated API from a sandbox](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/): Let code in a Container or Dynamic Worker call an authenticated API without giving it the access token.
- [Clone a private repository](https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/): Clone a private GitHub repository into a Linux sandbox without giving the sandbox the access token.

For every outbound option in each environment, refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/) for Containers and [Egress control](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/) for Dynamic Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/network/#page","headline":"Credentials and network access","description":"Add credentials in your Worker so the sandbox never holds them, and decide which services code in a sandbox can reach.","url":"https://developers.cloudflare.com/sandbox/network/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/network/og.png?v=8280ee4acbda7ce9","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
