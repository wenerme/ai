---
description: Configurable parameters for origin rules.
title: Origin Rules API parameter reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Origin Rules API parameter reference

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/origin-rules/parameters/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Create [different overrides](https://developers.cloudflare.com/rules/origin-rules/features/) by including different action parameters in the `action_parameters` field:

| Override type                                   | What to include                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| Host header override                            | [host\_header parameter](#host-header-override-parameters)                     |
| SNI override                                    | [sni object](#sni-override-parameters)                                         |
| DNS record override / Destination port override | [origin object](#dns-record-override-and-destination-port-override-parameters) |

Note

The same origin rule can have different types of overrides. Refer to [Configuring several overrides in the same rule](#configuring-several-overrides-in-the-same-rule) for a syntax example.

## Host header override parameters

The full syntax of the `action_parameters` field for overriding the HTTP `Host` header is the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>"
}
```

## SNI override parameters

The full syntax of the `action_parameters` field for overriding the SNI value of incoming requests is the following:

```json
"action_parameters": {
  "sni": {
    "value": "<SNI_VALUE>"
  }
}
```

## DNS record override and destination port override parameters

The full syntax of the `action_parameters` field for overriding both the hostname and the destination port of incoming requests is the following:

```json
"action_parameters": {
  "origin": {
    "host": "<HOSTNAME>",
    "port": <PORT>
  }
}
```

If you are only overriding the hostname or the port, omit the `port` or `host` parameter, respectively.

## Configuring several overrides in the same rule

The same origin rule can have different types of overrides. For example, a single origin rule can perform an HTTP `Host` header override and a destination port override. The syntax of such a rule would be the following:

```json
"action_parameters": {
  "host_header": "<HOST_HEADER_VALUE>",
  "origin": {
    "port": <PORT>
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/parameters/#page","headline":"Origin Rules API parameter reference · Cloudflare Rules docs","description":"Configurable parameters for origin rules.","url":"https://developers.cloudflare.com/rules/origin-rules/parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
