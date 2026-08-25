---
description: Learn about the expression syntax used to build Gateway DNS, HTTP, Network, Egress, and Resolver policies.
title: Gateway policy expressions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Gateway policy expressions

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/expression-syntax/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Gateway policies use a wirefilter-based expression language to match traffic against selectors (criteria). This syntax is similar to, but distinct from, the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) used by WAF, Rules, and other Cloudflare products. Refer to [Gateway versus Ruleset Engine](#gateway-versus-ruleset-engine) for details on the differences.

Important

The [Ruleset Engine documentation](https://developers.cloudflare.com/ruleset-engine/rules-language/) does not apply to Gateway policies. Gateway has its own set of selectors and fields specific to Zero Trust traffic filtering. For available selectors, refer to the documentation for each policy type:

* [DNS policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#selectors)
* [HTTP policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#selectors)
* [Network policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#selectors)
* [Egress policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selectors)
* [Resolver policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#selectors)

## Expression syntax

Gateway expressions follow this pattern:

```txt
<field> <operator> <value>
```

For example:

```txt
dns.fqdn == "example.com"
http.request.host == "api.example.com"
identity.email == "user@company.com"
```

### Operators

Gateway supports the following operators:

| Operator | Name                       | Example                                             |
| -------- | -------------------------- | --------------------------------------------------- |
| \==      | Equals                     | dns.fqdn == "example.com"                           |
| !=       | Does not equal             | http.request.host != "blocked.com"                  |
| in       | Value is in set            | net.dst.port in {80 443}                            |
| matches  | Matches regular expression | http.request.host matches ".\*\\\\.example\\\\.com" |
| \>       | Greater than               | http.upload.file.size > 10                          |
| \>=      | Greater than or equal to   | http.download.file.size >= 100                      |
| <        | Less than                  | http.upload.file.size < 50                          |
| <=       | Less than or equal to      | http.download.file.size <= 200                      |

### Logical operators

Combine multiple conditions using logical operators:

| Operator | Name        | Example                                                             |
| -------- | ----------- | ------------------------------------------------------------------- |
| and      | Logical AND | dns.fqdn == "example.com" and identity.email == "admin@company.com" |
| or       | Logical OR  | net.dst.port == 80 or net.dst.port == 443                           |
| not      | Logical NOT | not(identity.email == "guest@company.com")                          |

## Array handling

Some Gateway fields return arrays (multiple values). Use the `any()` function to match if any element in the array meets the condition:

```txt
any(http.request.uri.content_category[*] in {17 85 102})
```

```txt
any(identity.groups[*].name in {"Engineering" "Security"})
```

```txt
any(http.request.domains[*] == "example.com")
```

The `[*]` notation indicates that the function should evaluate all elements in the array.

## List handling

You can reference [lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) in your expressions using the list UUID:

```txt
http.request.host in $<LIST_UUID>
```

```txt
any(http.request.domains[*] in $<LIST_UUID>)
```

To find a list's UUID, go to **My Team** \> **Lists** in Zero Trust and select the list. The UUID appears in the browser URL.

## Common field patterns

Each Gateway policy type has its own set of available fields. The following table shows the field prefixes used by each policy type:

| Policy type    | Field prefix     | Example fields                                            |
| -------------- | ---------------- | --------------------------------------------------------- |
| DNS            | dns.             | dns.fqdn, dns.content\_category, dns.src\_ip              |
| HTTP           | http.            | http.request.host, http.request.uri, http.request.domains |
| Network        | net.             | net.dst.ip, net.dst.port, net.src.ip                      |
| Identity       | identity.        | identity.email, identity.groups, identity.name            |
| Device posture | device\_posture. | device\_posture.checks.passed                             |

For a complete list of available fields for each policy type, refer to the selectors documentation linked at the top of this page.

## Example expressions

### Block a domain in a DNS policy

```txt
dns.fqdn == "example.com"
```

### Block multiple content categories in an HTTP policy

```txt
any(http.request.uri.content_category[*] in {17 85 102})
```

### Allow traffic from a specific user group

```txt
any(identity.groups[*].name in {"Engineering"})
```

### Block traffic to a destination IP range in a Network policy

```txt
net.dst.ip in {10.0.0.0/8}
```

### Combine identity and traffic conditions

```txt
http.request.host == "internal.example.com" and identity.email matches ".*@company.com"
```

## Gateway versus Ruleset Engine

The following table summarizes the key differences between the Rules language\](/ruleset-engine/rules-language/) (supported by the Ruleset Engine) and Gateway policy expressions:

|                     | Ruleset Engine                                                                     | Gateway                                                                                |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Products**        | WAF, Transform Rules, Cache Rules, Configuration Rules                             | DNS, HTTP, Network, Egress, Resolver policies                                          |
| **Field examples**  | http.request.uri.path, cf.bot\_management.score, ip.src                            | dns.fqdn, http.request.host, identity.email                                            |
| **Identity fields** | Not available                                                                      | Available (for example, identity.email, identity.groups)                               |
| **DNS fields**      | Not available                                                                      | Available (for example, dns.fqdn, dns.content\_category)                               |
| **Documentation**   | [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) | [Traffic policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) |

Note

Do not reference the [Ruleset Engine fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) when building Gateway policies. Gateway has its own field set documented on each policy type page.

## Related resources

* [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)
* [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)
* [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)
* [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/)
* [Lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/expression-syntax/#page","headline":"Gateway policy expressions · Cloudflare One docs","description":"Learn about the expression syntax used to build Gateway DNS, HTTP, Network, Egress, and Resolver policies.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/expression-syntax/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
