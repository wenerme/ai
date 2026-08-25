---
description: How Remote browser isolation works in Browser Isolation.
title: Remote browser isolation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Remote browser isolation

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Remote browser isolation is available as an add-on to Zero Trust Pay-as-you-go and Enterprise plans.

Cloudflare Browser Isolation complements the [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) (which inspects and filters HTTP/HTTPS traffic) and [Zero Trust Network Access](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) (which controls access to private applications) by executing active webpage content — executable code such as JavaScript and plugins — in a secure isolated browser. Because active content executes remotely instead of on the user's device, Browser Isolation protects users from zero-day attacks (attacks that exploit vulnerabilities with no available patch) and malware.

Browser Isolation also protects users from phishing attacks by preventing user input on risky websites and controlling data transmission to sensitive web applications. You can further filter isolated traffic with Gateway [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) and [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) policies.

Remote browsing is invisible to the user who continues to use their browser normally without changing their preferred browser and habits. Every open tab and window is automatically isolated. When the user closes the isolated browser, their session is automatically deleted.

## Privacy

Cloudflare Browser Isolation is a security product. In order to serve transparent isolated browsing and block web based threats our network decrypts Internet traffic using the [Cloudflare root CA](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/). Traffic logs are retained as per the [Zero Trust](https://developers.cloudflare.com/cloudflare-one/insights/logs/) documentation.

## Troubleshooting

For help resolving common issues with Browser Isolation, refer to [Troubleshoot Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/#page","headline":"Remote browser isolation · Cloudflare One docs","description":"How Remote browser isolation works in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
