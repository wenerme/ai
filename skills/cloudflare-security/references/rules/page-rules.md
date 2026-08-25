---
description: Trigger actions based on URL patterns with Page Rules (deprecated).
title: Page Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Page Rules

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/page-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Page Rules trigger one or more actions whenever a certain URL pattern is matched. Page Rules are available in **Rules** \> **Page Rules**.

## Availability

The default number of allowed page rules depends on the domain plan as shown below.

|                 | Free | Pro | Business | Enterprise |
| --------------- | ---- | --- | -------- | ---------- |
| Availability    | Yes  | Yes | Yes      | Yes        |
| Number of rules | 3    | 20  | 50       | 125        |

---

## Before getting started

It is important to understand a few Page Rules behaviors.

### Page Rules require proxied DNS records

Page Rules require a [proxied](https://developers.cloudflare.com/dns/proxy-status/) DNS record for your page rule to work. Page Rules will not apply to hostnames that do not exist in DNS or are not being directed to Cloudflare.

If you are creating a Page Rule for a hostname that does not have a real origin server, you still need a proxied DNS record. You can use a reserved IP address or domain as a placeholder. The record only needs to exist so that Cloudflare proxies traffic for that hostname. Create one of the following:

```plaintext
www.example.com  A      192.0.2.1
www.example.com  AAAA   2001:DB8::1
www.example.com  CNAME  domain.example
```

Cloudflare recommends using only reserved IP addresses or domain names for placeholder records to avoid accidentally routing traffic to infrastructure you do not own.

For more information on reserved IP addresses or top level domains, please refer to these RFCs:

* [RFC 5737 ↗](https://datatracker.ietf.org/doc/html/rfc5737)
* [RFC 3849 ↗](https://datatracker.ietf.org/doc/html/rfc3849)
* [RFC 2606 ↗](https://datatracker.ietf.org/doc/html/rfc2606)

### Priority order matters

Only the highest priority matching page rule takes effect on a request.

Page Rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top. For this reason, Cloudflare recommends ordering your rules from most specific to least specific.

A page rule matches a URL pattern based on the following format (comprised of five segments):

```txt
<SCHEME>://<HOSTNAME>:<PORT>/<PATH>?<QUERY_STRING>
```

An example URL with all the segments looks like the following:

```txt
https://www.example.com:443/image.png?parameter1=value1
```

The `<SCHEME>` and `<PORT>` segments are optional. If omitted, `<SCHEME>` matches both `http://` and `https://` protocols. If no `<PORT>` is specified, the rule will match all ports.

### Disabled page rules

When a page rule is disabled, actions will not trigger, but the rule will:

* Still appear in the Cloudflare dashboard.
* Be editable.
* Count against the number of rules allowed for your domain.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/page-rules/#page","headline":"Page Rules · Cloudflare Rules docs","description":"Trigger actions based on URL patterns with Page Rules (deprecated).","url":"https://developers.cloudflare.com/rules/page-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
