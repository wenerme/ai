---
description: Control the geographic storage location of your private SSL/TLS keys.
title: Geo Key Manager
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Geo Key Manager

Last updated Jul 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/geo-key-manager/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Geo Key Manager offers enhanced control over the storage location of your private SSL/TLS keys — the cryptographic keys that Cloudflare uses to decrypt your HTTPS traffic. By restricting where these keys are stored, you can ensure compliance with regional data regulations and security requirements.

## Customize key storage

By default, your private keys are encrypted and securely distributed to each Cloudflare data center, where they are used for local TLS termination (the process of decrypting incoming HTTPS traffic). Geo Key Manager allows you to choose where you want to store your private keys.

Geo Key Manager was restricted to the US, EU, and high-security data centers, but with the new version of Geo Key Manager, available in [Closed Beta ↗](https://blog.cloudflare.com/configurable-and-scalable-geo-key-manager-closed-beta/), you can now create `allowlists` and `blocklists` of countries in which your private keys will be stored. That means that you will be able define specific geographic locations where to store keys, for instance you can store your private keys exclusively in Australia or limit private keys storage to the EU and the UK.

Geo Key Manager uses its own country-based storage model, separate from [Regional Services regions](https://developers.cloudflare.com/data-localization/region-support/#region-types). For the regions supported by each Data Localization Suite feature, refer to [Region support](https://developers.cloudflare.com/data-localization/region-support/).

## Cloudflare data center flow example

The following diagram shows what happens when an end user connects to a Cloudflare data center that does not hold your private key. Because TLS termination requires the private key, the local data center must request a temporary session key (a short-lived symmetric encryption key) from a data center in an authorized region. Once the session key is established, the local data center can decrypt traffic for the remainder of the connection without contacting the key-holding data center again. This extra step adds latency on the first request, which can be as much as a second if the key-holding data center is geographically distant.


sequenceDiagram
    participant User as End user
    participant CloudflarePoP as Closest data center without TLS Key
    participant CloudflarePoPwTLS as Data center with TLS Key

    User->>CloudflarePoP: Initial request
    Note right of CloudflarePoP: Closest data center cannot decrypt
    CloudflarePoP-->>CloudflarePoPwTLS: Requests TLS Signature
    CloudflarePoPwTLS-->>CloudflarePoP: Sends TLS Signature in order to establish Session Key
    Note right of CloudflarePoP: Decrypts and performs business logic (for example, WAF, Configuration Rules, Load Balancing)
    CloudflarePoP-->>User: Subsequent requests use the Session Key
    User-->>CloudflarePoP: Subsequent requests use the Session Key


For detailed information on setup and supported options, refer to [Geo Key Manager documentation](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/geo-key-manager/#page","headline":"Geo Key Manager · Cloudflare Data Localization Suite docs","description":"Control the geographic storage location of your private SSL/TLS keys.","url":"https://developers.cloudflare.com/data-localization/geo-key-manager/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","Compliance"]}
```
