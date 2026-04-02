---
title: Expression validation
description: The Cloudflare Filters API supports an endpoint for validating expressions.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-filters/validation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Expression validation

The Cloudflare Filters API supports an endpoint for validating expressions.

## Examples

### Validate expression via query string

Request

```

curl "https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

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

```

Filter parsing error:

`ip.src==34`

          ^^ couldn't parse address in network: invalid IP address syntax


```

### Validate expression via JSON object

Request

```

curl "https://api.cloudflare.com/client/v4/filters/validate-expr" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}"

}'


```

Response

```

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

```

Filter parsing error:

`ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}`

                                       ^^^^ number too large to fit in target type while parsing with radix 10


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}},{"@type":"ListItem","position":5,"item":{"@id":"/firewall/api/cf-filters/validation/","name":"Expression validation"}}]}
```
