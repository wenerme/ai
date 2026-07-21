---
title: Expression validation
description: Validate firewall rule expressions via the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Expression validation

The Cloudflare Filters API supports an endpoint for validating expressions.

## Examples

### Validate expression via query string

**Request**

```bash
curl "https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

**Response**

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

**Request**

```bash
curl "https://api.cloudflare.com/client/v4/filters/validate-expr" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}"
}'
```

**Response**

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-filters/validation/#page","headline":"Expression validation · Cloudflare Firewall Rules (deprecated) docs","description":"Validate firewall rule expressions via the API.","url":"https://developers.cloudflare.com/firewall/api/cf-filters/validation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/validation/","name":"Expression validation"}}]}
```
