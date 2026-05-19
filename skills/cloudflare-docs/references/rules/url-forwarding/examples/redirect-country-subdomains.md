---
title: Redirect local visitors to specific subdomains
description: Create a redirect rule to redirect United Kingdom and France visitors from the `example.com` website's  root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirect local visitors to specific subdomains

Create a redirect rule to redirect United Kingdom and France visitors from the `example.com` website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

This example single redirect for zone `example.com` will redirect United Kingdom and France visitors requesting the website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

**When incoming requests match**

Using the Expression Editor:  
`(ip.src.country eq "GB" or ip.src.country eq "FR") and http.request.uri.path eq "/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `lower(concat("https://", ip.src.country, ".example.com"))`
* **Status code:** _301_

For example, the redirect rule would perform the following redirects:

| Visitor country | Request URL | Target URL             | Status code |
| --------------- | ----------- | ---------------------- | ----------- |
| United Kingdom  | example.com | https://gb.example.com | 301         |
| France          | example.com | https://fr.example.com | 301         |
| United States   | example.com | (unchanged)            | n/a         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-country-subdomains/","name":"Redirect local visitors to specific subdomains"}}]}
```
