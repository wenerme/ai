---
description: Validate firewall rule expressions via the API.
title: Expression validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Expression validation

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-filters/validation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare Filters API supports an endpoint for validating expressions.

## Examples

### Validate expression via query string

```bash
curl "https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
{
  "result": null,
  "success": false,
  "errors": [
    {
      "message": "Filter parsing error:\n`ip.src==34`\n          ^^ couldn't parse address in network: invalid IP address syntax\n"
    }
  ],
  "messages": null
}
```

Note the validation error in the response. In this example, the error is due to an invalid IP address format:

```txt
Filter parsing error:
`ip.src==34`
          ^^ couldn't parse address in network: invalid IP address syntax
```

### Validate expression via JSON object

```bash
curl "https://api.cloudflare.com/client/v4/filters/validate-expr" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}"
}'
```

```json
{
  "result": null,
  "success": false,
  "errors": [
    {
      "message": "Filter parsing error:\n`ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}`\n                                        ^^^^ number too large to fit in target type while parsing with radix 10\n"
    }
  ],
  "messages": null
}
```

Note the validation error in the response. In this example, the value for the subnet mask, `/2000`, is not a valid IPv6 CIDR mask:

```txt
Filter parsing error:
`ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}`
                                       ^^^^ number too large to fit in target type while parsing with radix 10
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-filters/validation/#page","headline":"Expression validation · Cloudflare Firewall Rules (deprecated) docs","description":"Validate firewall rule expressions via the API.","url":"https://developers.cloudflare.com/firewall/api/cf-filters/validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
